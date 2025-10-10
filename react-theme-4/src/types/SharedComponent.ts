import type { FormikProps } from 'formik';
import type { store } from '@/store/store';

export interface InputFieldProps<T = any> {
  id: string;
  type?: string;
  placeholder?: string;
  formik?: FormikProps<T>;
  label?: string;
  labelExtraParams?: boolean;
  disabled?: boolean;
  value?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'underline' | 'unstyled';
  className?: string;
  inputClassName?: string;
  readOnly?: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ToastObj {
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  autoHideDuration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  isLoading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmButtonText?: string;
}
