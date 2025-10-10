import { showToast } from './toast';

export const API_ENDPOINTS = {
  LOGOUT: '/auth/logout',
};

interface ApiResponse {
  status: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const logoutUser = async (): Promise<boolean | void> => {
  try {
    await delay(2000);

    const response: ApiResponse = {
      status: true,
      message: 'Logged out successfully',
    };

    if (response.status) {
      showToast.success('Logged Out Successfully!');
      return true;
    }
  } catch (error: any) {
    console.log(error);
  }
};
