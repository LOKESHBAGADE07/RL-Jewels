import React, { useMemo, useState } from 'react';
import { useCart } from '../stores/cart';
import Button from '../components/Button';
import { isValidIndianPincode, isValidPhone, required } from '../lib/validation';
import { useAuth } from '../context/AuthContext';
import { useOrders, type Address } from '../stores/orders';
import { useAddresses } from '../stores/addresses';
import { useNavigate } from 'react-router-dom';
import { payWithRazorpay } from '../lib/payment';
import useDocumentTitle from '../lib/useDocumentTitle';

type Step = 1 | 2 | 3 | 4 | 5;

export default function CheckoutPage() {
  useDocumentTitle('Checkout');
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const cart = useCart();
  const subtotal = useMemo(() => cart.subtotal(), [cart]);
  const shippingFee = subtotal > 49999 ? 0 : 199; // free shipping over 49,999
  const total = subtotal + (cart.items.length ? shippingFee : 0);
  const [step, setStep] = useState<Step>(1);
  const [addr, setAddr] = useState<Address>({
    id: 'ship-1',
    fullName: user?.displayName || '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [saveAddress, setSaveAddress] = useState(true);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const orders = useOrders();
  const addrBook = useAddresses();
  const hasSaved = addrBook.addresses.length > 0;
  const defaultSaved = addrBook.addresses.find(a => a.id === addrBook.defaultId) || addrBook.addresses[0];

  const validateAddress = () => {
    const e: Record<string,string> = {};
    if (!required(addr.fullName)) e.fullName = 'Full name is required';
    if (!isValidPhone(addr.phone)) e.phone = 'Enter a valid 10-digit mobile number';
    if (!required(addr.address1)) e.address1 = 'Address is required';
    if (!required(addr.city)) e.city = 'City is required';
    if (!required(addr.state)) e.state = 'State is required';
    if (!isValidIndianPincode(addr.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async () => {
    const result = await payWithRazorpay(total * 100, {
      name: 'RL Jewels',
      description: 'Jewellery purchase',
      prefill: { name: addr.fullName, email: user?.email || undefined, contact: addr.phone }
    });
    if (result.status !== 'success') {
      alert(result.error || 'Payment was not completed');
      return;
    }
    const order = orders.placeOrder({
      items: cart.items.map(i => ({ id: i.id, title: i.title, image: i.image, price: i.price, qty: i.qty })),
      subtotal,
      shippingFee: cart.items.length ? shippingFee : 0,
      total,
      paymentMethod: 'Razorpay',
      customer: { uid: user?.uid || 'guest', email: user?.email || null, name: user?.displayName || null },
      shipping: addr,
    });
    orders.setPaymentStatus(order.id, 'Paid', result.paymentId);
    cart.clear();
    navigate('/order-confirmation', { state: { order: { id: order.id, total: order.total } } });
  };

  return (
    <section className="section-padding">
      <div className="max-content">
        <h1 className="font-serif text-2xl mb-6">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs mb-6">
          {[1,2,3,4,5].map(n => (
            <div key={n} className={`px-3 py-1 rounded-full border ${step===n ? 'bg-brand-red text-white border-brand-red' : 'border-accent-gold/40 text-ink-700'}`}>Step {n}</div>
          ))}
        </div>

        {cart.items.length === 0 && step !== 5 ? (
          <div className="text-sm text-ink-600">
            Your cart is empty. <button className="text-brand-red underline" onClick={() => navigate('/catalog')}>Browse products</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {step === 1 && (
                <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
                  <h2 className="font-semibold mb-2">Login / Guest Checkout</h2>
                  {user ? (
                    <p className="text-sm">Signed in as <strong>{user.email}</strong></p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm">You can continue as a guest or sign in for faster checkout.</p>
                      <div className="flex gap-2">
                        <Button onClick={() => setStep(2)} variant="secondary">Continue as Guest</Button>
                        <button onClick={signInWithGoogle} className="rounded-md bg-white border border-surface-300 hover:border-ink-300 text-ink-900 font-semibold px-4 py-2 flex items-center gap-2">
                          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <Button onClick={() => setStep(2)}>Next</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
                  <h2 className="font-semibold mb-4">Shipping Information</h2>
                  {hasSaved && (
                    <div className="mb-4 p-3 rounded border border-accent-gold/30 bg-white/60">
                      <p className="text-sm font-medium mb-2">Choose a saved address</p>
                      <div className="space-y-2">
                        {addrBook.addresses.map(a => (
                          <label key={a.id} className="flex items-start gap-3 p-2 rounded border border-accent-gold/30">
                            <input type="radio" name="savedAddr" defaultChecked={addrBook.defaultId === a.id} onChange={() => setAddr({ ...a })} />
                            <div className="text-sm">
                              <p className="font-medium">{a.fullName} • {a.phone}</p>
                              <p>{a.address1}{a.address2 ? `, ${a.address2}` : ''}</p>
                              <p>{a.city}, {a.state} - {a.pincode}</p>
                            </div>
                            {addrBook.defaultId === a.id && (
                              <span className="ml-auto text-[10px] px-2 py-1 rounded-full border border-brand-red text-brand-red h-fit">Default</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1">Full Name</label>
                      <input value={addr.fullName} onChange={e=>setAddr({...addr, fullName: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.fullName ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Mobile Number</label>
                      <input value={addr.phone} onChange={e=>setAddr({...addr, phone: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs mb-1">Address</label>
                      <input value={addr.address1} onChange={e=>setAddr({...addr, address1: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.address1 ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.address1 && <p className="text-xs text-red-600 mt-1">{errors.address1}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs mb-1">Address 2 (optional)</label>
                      <input value={addr.address2} onChange={e=>setAddr({...addr, address2: e.target.value})} className="w-full border rounded px-3 py-2 border-accent-gold/40" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">City</label>
                      <input value={addr.city} onChange={e=>setAddr({...addr, city: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.city ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1">State</label>
                      <input value={addr.state} onChange={e=>setAddr({...addr, state: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.state ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Pincode</label>
                      <input value={addr.pincode} onChange={e=>setAddr({...addr, pincode: e.target.value})} className={`w-full border rounded px-3 py-2 ${errors.pincode ? 'border-red-500' : 'border-accent-gold/40'}`} />
                      {errors.pincode && <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm mt-2">
                    <input type="checkbox" checked={saveAddress} onChange={e=>setSaveAddress(e.target.checked)} />
                    Save this address to my account (local)
                  </label>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={() => {
                      if (validateAddress()) {
                        if (saveAddress) {
                          // Prevent duplicates: check if identical address exists
                          const exists = addrBook.addresses.find(a => (
                            a.fullName === addr.fullName && a.phone === addr.phone && a.address1 === addr.address1 && a.address2 === addr.address2 && a.city === addr.city && a.state === addr.state && a.pincode === addr.pincode
                          ));
                          if (exists) {
                            setAddr(exists);
                            addrBook.setDefault(exists.id);
                          } else {
                            const id = `addr-${Date.now()}`;
                            const toSave = { ...addr, id };
                            setAddr(toSave);
                            addrBook.add(toSave);
                            addrBook.setDefault(id);
                          }
                        }
                        setStep(3);
                      }
                    }}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
                  <h2 className="font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    {cart.items.map(i => (
                      <div key={i.id} className="flex items-center gap-3">
                        <img src={i.image} className="w-16 h-16 rounded object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{i.title}</p>
                          <p className="text-xs text-ink-600">Qty: {i.qty}</p>
                        </div>
                        <div className="text-sm font-semibold">₹ {(i.price * i.qty).toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t pt-3 text-sm space-y-1">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹ {subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>{shippingFee ? `₹ ${shippingFee.toLocaleString('en-IN')}` : 'Free'}</span></div>
                    <div className="flex justify-between font-semibold text-ink-900"><span>Total</span><span>₹ {total.toLocaleString('en-IN')}</span></div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                    <Button onClick={() => setStep(4)}>Proceed to Payment</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
                  <h2 className="font-semibold mb-2">Payment</h2>
                  <p className="text-sm text-ink-700 mb-3">You will be redirected to our secure payment partner to complete the transaction.</p>
                  <Button onClick={placeOrder} className="w-full">Pay ₹ {total.toLocaleString('en-IN')} Securely</Button>
                  <p className="text-[11px] text-ink-500 mt-2">By continuing you agree to our Terms & Conditions and Privacy Policy.</p>
                </div>
              )}

              {step === 5 && (
                <div className="bg-white rounded-lg border border-accent-gold/30 p-5">
                  <h2 className="font-semibold mb-2">Thank You!</h2>
                  <p className="text-sm">Your payment was successful and your order has been placed.</p>
                  <div className="mt-4">
                    <Button onClick={() => navigate('/account')}>Go to My Orders</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="bg-white rounded-lg border border-accent-gold/30 p-4 h-fit">
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="flex justify-between text-sm"><span>Items</span><span>{cart.count()}</span></div>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹ {subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>{cart.items.length ? (shippingFee ? `₹ ${shippingFee.toLocaleString('en-IN')}` : 'Free') : '-'}</span></div>
              <div className="mt-2 flex justify-between font-semibold"><span>Total</span><span>₹ {total.toLocaleString('en-IN')}</span></div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
