import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { X } from 'lucide-react';
import { setToastObj } from '@/store/slices/alertsSlice';
import type { RootState, ToastObj } from '@/types/SharedComponent';

const ToastAlert = () => {
  const dispatch = useDispatch();
  const toastObj = useSelector((state: RootState) => state.alerts.toastObj);

  useEffect(() => {
    if (toastObj) {
      const severityClass =
        toastObj.severity === 'success'
          ? 'bg-green-600 text-white'
          : toastObj.severity === 'error'
            ? 'bg-red-600 text-white'
            : toastObj.severity === 'warning'
              ? 'bg-yellow-600 text-white'
              : 'bg-blue-600 text-white';

      toast.custom(
        t => (
          <div className={`relative min-w-62 rounded-lg px-8 py-4 shadow-lg ${severityClass}`}>
            <button
              onClick={() => toast.dismiss(t)}
              className="absolute top-2 right-2 rounded-full p-1 text-white opacity-80 transition-opacity hover:opacity-100"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="pr-6">
              <strong className="text-base font-semibold">{getTitle(toastObj.severity)}</strong>
              <p className="mt-1 text-sm">{toastObj.message || 'Oops! Something unexpected happened.'}</p>
            </div>
          </div>
        ),
        {
          duration: toastObj.autoHideDuration ?? 5000,
          position: toastObj.position || 'bottom-right',
        },
      );

      dispatch(setToastObj(null));
    }
  }, [toastObj, dispatch]);

  return <Toaster richColors />;
};

const getTitle = (severity: ToastObj['severity']): string => severity?.toUpperCase() || 'INFO';

export default ToastAlert;
