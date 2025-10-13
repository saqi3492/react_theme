import { handleCatchMessages } from '@/utils/helper';
import { showToast } from '../../lib/toast';
import { AxiosError } from 'axios';

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

export const logoutUser = async (): Promise<boolean> => {
  try {
    await delay(2000);

    const response: ApiResponse = { status: true, message: 'Logged out successfully' };

    if (response.status) {
      showToast.success('Logged Out Successfully!');
      return true;
    }
    return false;
  } catch (error: unknown) {
    handleCatchMessages(error as AxiosError<{ message?: string }>);
    return false;
  }
};
