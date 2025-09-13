// Shared DTOs and types used across API calls

export type Money = number; // amount in paise for INR; use integers

export interface ProductDTO {
  id: string;
  title: string;
  sku?: string;
  price: Money; // in paise
  originalPrice?: Money;
  image?: string;
  images?: string[];
  stock?: number;
  active?: boolean;
  tags?: string[];
  attributes?: Record<string, string | number>;
}

export interface CartItemDTO {
  productId: string;
  title: string;
  price: Money;
  image?: string;
  qty: number;
}

export interface AddressDTO {
  id?: string;
  fullName: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderDTO {
  id: string;
  uid?: string | null;
  items: CartItemDTO[];
  subtotal: Money;
  shippingFee: Money;
  total: Money;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'PaymentPending' | 'PaymentFailed' | 'Paid';
  payment?: {
    provider: 'Razorpay';
    status: 'Pending' | 'Paid' | 'Failed';
    orderId?: string;
    paymentId?: string;
    signature?: string;
  };
  shipping?: AddressDTO;
  tracking?: { courier?: string; awb?: string; url?: string };
  createdAt?: string;
}

export interface CreateRazorpayOrderRequest {
  amount: Money; // paise
  currency?: 'INR';
  receipt?: string;
}

export interface CreateRazorpayOrderResponse {
  orderId: string;
  amount: Money;
  currency: 'INR';
}

export interface VerifyAndCaptureRequest {
  orderId: string;
  paymentId: string;
  signature: string;
}
