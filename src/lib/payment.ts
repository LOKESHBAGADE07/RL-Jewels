declare global {
  interface Window { Razorpay?: any }
}

export type PaymentResult = { status: 'success' | 'failed' | 'cancelled'; paymentId?: string; error?: string };

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    const s = document.createElement('script');
    s.src = src; s.async = true; s.onload = () => resolve(true); s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export async function payWithRazorpay(amountInPaise: number, opts?: { name?: string; description?: string; prefill?: { name?: string; email?: string; contact?: string } }): Promise<PaymentResult> {
  const key = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID as string | undefined;
  if (!key) {
    return { status: 'failed', error: 'Razorpay key not configured' };
  }
  const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!ok || !window.Razorpay) return { status: 'failed', error: 'Razorpay SDK failed to load' };
  return new Promise((resolve) => {
    const rzp = new window.Razorpay({
      key,
      amount: amountInPaise,
      currency: 'INR',
      name: opts?.name || 'RL Jewels',
      description: opts?.description || 'Secure Payment',
      handler: function (response: any) {
        resolve({ status: 'success', paymentId: response.razorpay_payment_id });
      },
      modal: {
        ondismiss: function () { resolve({ status: 'cancelled' }); }
      },
      prefill: opts?.prefill
    });
    rzp.open();
  });
}
