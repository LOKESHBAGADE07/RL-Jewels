import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrders, generateTrackingURL } from '../stores/orders';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const order = orders.find(o => o.id === id);
  useDocumentTitle(order ? `Order ${order.id}` : 'Order');

  if (!order) {
    return (
      <section className="section-padding">
        <div className="max-content">
          <h1 className="font-serif text-2xl mb-4">Order not found</h1>
          <button className="text-brand-red underline" onClick={() => navigate('/account')}>Back to My Orders</button>
        </div>
      </section>
    );
  }

  const trackUrl = order.tracking ? generateTrackingURL(order.tracking.courier, order.tracking.awb) : undefined;

  return (
    <section className="section-padding">
      <div className="max-content">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-2xl">Order {order.id}</h1>
          <Link to="/account" className="text-sm text-brand-red underline">Back to Account</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
              <h2 className="font-semibold mb-2">Status</h2>
              <p className="text-sm">{order.status} • Placed on {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm">Payment: {order.payment.method} • {order.payment.status}{order.payment.txnId ? ` • ${order.payment.txnId}` : ''}</p>
              {order.tracking && (
                <p className="text-sm mt-1">Tracking: {order.tracking.courier} • AWB {order.tracking.awb} {trackUrl && (<a className="text-brand-red underline ml-1" href={trackUrl} target="_blank">Track</a>)}</p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
              <h2 className="font-semibold mb-2">Items</h2>
              <ul className="divide-y">
                {order.items.map(i => (
                  <li key={i.id} className="py-3 flex items-center gap-3">
                    <img src={i.image} className="w-16 h-16 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{i.title}</p>
                      <p className="text-xs text-ink-600">Qty: {i.qty}</p>
                    </div>
                    <div className="text-sm font-semibold">₹ {(i.price * i.qty).toLocaleString('en-IN')}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
              <h2 className="font-semibold mb-2">Delivery Address</h2>
              <div className="text-sm">
                <p className="font-medium">{order.shipping.fullName} • {order.shipping.phone}</p>
                <p>{order.shipping.address1}{order.shipping.address2 ? `, ${order.shipping.address2}` : ''}</p>
                <p>{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>₹ {order.subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{order.shippingFee ? `₹ ${order.shippingFee.toLocaleString('en-IN')}` : 'Free'}</span></div>
                <div className="flex justify-between font-semibold"><span>Total</span><span>₹ {order.total.toLocaleString('en-IN')}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
