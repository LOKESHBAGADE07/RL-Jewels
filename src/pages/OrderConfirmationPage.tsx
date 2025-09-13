import { useLocation, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function OrderConfirmationPage() {
  useDocumentTitle('Order Confirmed');
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const order = state?.order as { id: string; total: number } | undefined;
  return (
    <section className="section-padding">
      <div className="max-content">
        <h1 className="font-serif text-2xl mb-2">Thank you for your purchase</h1>
        {!order ? (
          <div className="text-sm">Order not found. <button className="text-brand-red underline" onClick={()=>navigate('/account')}>View My Orders</button></div>
        ) : (
          <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
            <p className="text-sm">Your order has been placed successfully.</p>
            <p className="mt-2">Order Number: <strong>{order.id}</strong></p>
            <p>Total Paid: <strong>₹ {order.total.toLocaleString('en-IN')}</strong></p>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>navigate('/account')} className="rounded-md bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-4 py-2">Go to My Orders</button>
              <button onClick={()=>navigate('/catalog')} className="rounded-md bg-white border border-surface-300 hover:border-ink-300 text-ink-900 font-semibold px-4 py-2">Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
