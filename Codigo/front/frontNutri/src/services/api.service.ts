import { message } from "antd";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


export const callExternalApi = async (options: {
  config: AxiosRequestConfig;
}) => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;

    console.log("nao caiu catch")

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: defineError(error)
    };
  }

};

const defineError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data.error;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error.error !== null) {
    return error.error;
  }

  return null;
}
