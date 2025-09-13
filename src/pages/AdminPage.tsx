import { useOrders, generateTrackingURL } from '../stores/orders';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function AdminPage() {
  useDocumentTitle('Admin');
  const { orders, advanceStatus, setTracking } = useOrders();
  return (
    <section className="section-padding">
      <div className="max-content">
        <h1 className="font-serif text-2xl mb-4">Admin Panel</h1>
        <p className="text-xs text-ink-600 mb-4">This is a lightweight local admin panel for demo. Secure server-side admin is required in production.</p>
        {orders.length === 0 ? (
          <p className="text-sm">No orders yet.</p>
        ) : (
          <table className="w-full text-sm border border-accent-gold/30 bg-white">
            <thead>
              <tr className="bg-surface-200/60">
                <th className="text-left p-2">Order</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Items</th>
                <th className="text-left p-2">Total</th>
                <th className="text-left p-2">Payment</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="p-2">{o.items.length}</td>
                  <td className="p-2">₹ {o.total.toLocaleString('en-IN')}</td>
                  <td className="p-2">{o.payment.status}</td>
                  <td className="p-2">
                    <select value={o.status} onChange={e=>advanceStatus(o.id, e.target.value as any)} className="border border-accent-gold/40 rounded px-2 py-1">
                      {['Processing','Shipped','Delivered','Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-2 text-xs">
                    <div className="flex flex-col gap-1">
                      <select className="border border-accent-gold/40 rounded px-2 py-1" value={o.tracking?.courier || 'Shiprocket'} onChange={e=>setTracking(o.id, { courier: e.target.value as any, awb: o.tracking?.awb || '' , url: o.tracking?.awb ? generateTrackingURL(e.target.value as any, o.tracking.awb) : undefined })}>
                        {['Shiprocket','Blue Dart','Delhivery','Self'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input placeholder="AWB" className="border border-accent-gold/40 rounded px-2 py-1" value={o.tracking?.awb || ''} onChange={e=>setTracking(o.id, { courier: o.tracking?.courier || 'Shiprocket', awb: e.target.value, url: generateTrackingURL(o.tracking?.courier || 'Shiprocket', e.target.value) })} />
                      {o.tracking?.awb && generateTrackingURL(o.tracking.courier, o.tracking.awb) && (
                        <a className="text-brand-red underline" target="_blank" href={generateTrackingURL(o.tracking.courier, o.tracking.awb)}>Open tracking</a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
