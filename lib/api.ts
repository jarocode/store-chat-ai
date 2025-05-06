// lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

// 1. Create an axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // include cookies in browser requests
});

// 2. Request interceptor (e.g. add headers/logging)
api.interceptors.request.use(
  (config) => {
    // you could add global headers here
    // config.headers['X-Custom-Header'] = 'foo'
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response interceptor (central error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data?.message || error.message;
      // e.g. handle 401 globally in client
      return Promise.reject(new Error(`API ${status}: ${msg}`));
    }
    return Promise.reject(error);
  }
);

export interface ApiRequestOptions extends AxiosRequestConfig {
  params?: Record<string, any>;
}

// 4. Single util function
export async function apiRequest<T = any>(
  options: ApiRequestOptions
): Promise<T> {
  try {
    // AUTO-FORWARD COOKIE on Server
    if (typeof window === "undefined") {
      const jwt = (await cookies()).get("jwt")?.value;
      if (jwt) {
        options.headers = {
          ...options.headers,
          Cookie: `jwt=${jwt}`,
        };
      }
    }

    const resp: AxiosResponse<T> = await api.request<T>({
      ...options,
      url: options.url!, // make sure url is provided
    });
    return resp.data;
  } catch (err: any) {
    // Already wrapped by interceptor, just rethrow
    throw err;
  }
}
