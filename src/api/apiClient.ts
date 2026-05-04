import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// In Android, 10.0.2.2 points to the host machine's localhost. 
// For Expo on a physical device, use your computer's local IP (e.g., 192.168.1.x).
const BASE_URL = 'http://192.168.1.16:3000/'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Replaces manual header adding in Java)
apiClient.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;