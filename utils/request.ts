import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = "https://api.github.com"

const client = axios.create({
  baseURL: API_URL,
});

export const request = async (options: AxiosRequestConfig) => {
  let token;

  const userState = {}

  if (userState) {
    token = 'accessToken';
  }

  // Set the authorization header
  if (token) {
    client.defaults.headers.common.Authorization = `${token}`;
  }
  const onSuccess = (response: AxiosResponse) => {
    return response?.data;
  };

  const onError = (error: AxiosError) => {
    console.log(`error request on endpoint ${options?.url} :`, {error})
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
