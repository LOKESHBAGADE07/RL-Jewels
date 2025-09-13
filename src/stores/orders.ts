import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string; // RLJ-YYYYMMDD-XXXX
  createdAt: string; // ISO
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  payment: {
    method: 'Razorpay' | 'COD' | 'UPI';
    status: 'Pending' | 'Paid' | 'Failed';
    txnId?: string;
  };
  customer: {
    uid: string; // 'guest' if not logged
    email?: string | null;
    name?: string | null;
  };
  shipping: Address;
  tracking?: {
    courier: 'Shiprocket' | 'Blue Dart' | 'Delhivery' | 'Self';
    awb: string;
    url?: string;
  };
};

type OrdersState = {
  orders: Order[];
  placeOrder: (o: Omit<Order, 'id' | 'createdAt' | 'status' | 'payment' | 'tracking'> & { paymentMethod: Order['payment']['method'] }) => Order;
  setPaymentStatus: (id: string, status: Order['payment']['status'], txnId?: string) => void;
  advanceStatus: (id: string, status: Order['status']) => void;
  setTracking: (id: string, tracking: Order['tracking']) => void;
};

const genId = () => {
  const now = new Date();
  const date = now.toISOString().slice(0,10).replace(/-/g,'');
  const rand = Math.floor(Math.random()*9000 + 1000);
  return `RLJ-${date}-${rand}`;
};

export const useOrders = create<OrdersState>()(persist((set, get) => ({
  orders: [],
  placeOrder: (input) => {
    const id = genId();
    const createdAt = new Date().toISOString();
    const order: Order = {
      id,
      createdAt,
      items: input.items,
      subtotal: input.subtotal,
      shippingFee: input.shippingFee,
      total: input.total,
      status: 'Processing',
      payment: { method: input.paymentMethod, status: input.paymentMethod === 'COD' ? 'Pending' : 'Pending' },
      customer: input.customer,
      shipping: input.shipping,
    };
    set(s => ({ orders: [order, ...s.orders] }));
    return order;
  },
  setPaymentStatus: (id, status, txnId) => set(s => ({
    orders: s.orders.map(o => o.id === id ? { ...o, payment: { ...o.payment, status, txnId } } : o)
  })),
  advanceStatus: (id, status) => set(s => ({
    orders: s.orders.map(o => o.id === id ? { ...o, status } : o)
  })),
  setTracking: (id, tracking) => set(s => ({
    orders: s.orders.map(o => o.id === id ? { ...o, tracking } : o)
  }))
}), {
  name: 'orders',
  storage: createJSONStorage(() => localStorage)
}));

export function generateTrackingURL(courier: NonNullable<Order['tracking']>['courier'], awb: string) {
  switch (courier) {
    case 'Shiprocket':
      return `https://www.shiprocket.in/shipment-tracking/${encodeURIComponent(awb)}`;
    case 'Blue Dart':
      return `https://www.bluedart.com/tracking?tracknum=${encodeURIComponent(awb)}`;
    case 'Delhivery':
      return `https://www.delhivery.com/track/package/${encodeURIComponent(awb)}`;
    default:
      return undefined;
  }
}
