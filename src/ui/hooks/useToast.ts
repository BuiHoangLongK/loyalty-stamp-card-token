'use client';

import { toast as sonnerToast } from 'sonner';

export const useToast = () => ({
  toast: sonnerToast,
  success: sonnerToast.success,
  error: sonnerToast.error,
  info: sonnerToast.info,
  warning: sonnerToast.warning,
});
