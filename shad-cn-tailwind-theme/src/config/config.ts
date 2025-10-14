export const config: Config = {
  isLocalHost: import.meta.env.VITE_IS_LOCAL_HOST === 'true',
  frontendUrl: import.meta.env.VITE_FRONTEND_URL!,
  backendUrl: import.meta.env.VITE_BACKEND_URL!,
};

interface Config {
  isLocalHost: boolean;
  frontendUrl: string;
  backendUrl: string;
}
