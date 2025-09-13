import { api } from './client';
import type { CreateRazorpayOrderRequest, CreateRazorpayOrderResponse, VerifyAndCaptureRequest } from './contracts';

export const paymentsApi = {
  createRazorpayOrder: (body: CreateRazorpayOrderRequest) =>
    api.post<CreateRazorpayOrderResponse>('/payments/createRazorpayOrder', body),
  verifyAndCapture: (body: VerifyAndCaptureRequest) =>
    api.post<{ status: 'ok' } | { status: 'error'; message: string }>('/payments/verifyAndCapture', body),
};
