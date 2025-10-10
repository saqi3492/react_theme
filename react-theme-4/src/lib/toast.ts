import { store } from '@/store/store';
import { setToastObj } from '@/store/slices/alertsSlice';
import type { ToastObj } from '@/types/SharedComponent';

const createToast = (toast: ToastObj) => {
  store.dispatch(setToastObj(toast));
};

export const showToast = {
  success: (message: string, duration?: number, position?: ToastObj['position']) => {
    createToast({ severity: 'success', message, autoHideDuration: duration, position });
  },

  error: (message: string, duration?: number, position?: ToastObj['position']) => {
    createToast({ severity: 'error', message, autoHideDuration: duration, position });
  },

  warning: (message: string, duration?: number, position?: ToastObj['position']) => {
    createToast({ severity: 'warning', message, autoHideDuration: duration, position });
  },

  info: (message: string, duration?: number, position?: ToastObj['position']) => {
    createToast({ severity: 'info', message, autoHideDuration: duration, position });
  },
};
