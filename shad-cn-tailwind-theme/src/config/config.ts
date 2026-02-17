export const config: Config = {
  frontendUrl: import.meta.env.VITE_FRONTEND_URL!,
  backendUrl: import.meta.env.VITE_BACKEND_URL!,
  dateFormat: 'MM-DD-YYYY',
  timeFormat: 'hh:mm a',
};

interface Config {
  frontendUrl: string;
  backendUrl: string;
  dateFormat: string;
  timeFormat: string;
}
