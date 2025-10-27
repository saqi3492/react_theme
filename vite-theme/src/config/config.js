export const config = {
  frontendUrl: import.meta.env.VITE_FRONTEND_URL,
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  clientId: import.meta.env.VITE_CLIENT_ID,
  cognitoDomain: import.meta.env.VITE_COGNITO_DOMAIN,
  openIdConnectScope: 'email openid profile',
  dateFormat: 'MM-DD-YYYY',
  timeFormat: 'hh:mm a',
};
