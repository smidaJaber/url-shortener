import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ShortenUrlResponse {
  shortUrl: string; 
}

interface ShortenUrlRequest {
  longUrl: string;
  customShortCode?: string; 
}
interface ShortenUrlError {
  message: string; 
}

const shortenUrl = async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
  const response = await axios.post<ShortenUrlResponse>(`https://url-shortener-ds5q.onrender.com/shorten`, data); 
  return response.data;
};

export const useShortenUrl = () => {
  return useMutation<ShortenUrlResponse, ShortenUrlError, ShortenUrlRequest>({
    mutationFn: shortenUrl,
    onError: (error) => {
      console.error('error  shortening URL:', error.message);
    },
  });
};