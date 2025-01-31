import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CheckCustomShortCodeResponse {
  available: boolean;
}

const checkCustomShortCode = async (customShortCode: string) => {
  const response = await axios.get<CheckCustomShortCodeResponse>(
    `https://url-shortener-ds5q.onrender.com/check/${customShortCode}`
  );
  return response.data;
};

export const useCheckCustomShortCode = (customShortCode: string) => {
  return useQuery({
    queryKey: ['checkCustomShortCode', customShortCode],
    queryFn: () => checkCustomShortCode(customShortCode),
    enabled: customShortCode.trim().length > 0, // only run if custom URL is not empty
  });
};