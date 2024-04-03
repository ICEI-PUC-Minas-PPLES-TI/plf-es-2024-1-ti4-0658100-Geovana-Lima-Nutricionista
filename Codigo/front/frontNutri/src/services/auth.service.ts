import { AxiosRequestConfig } from "axios";
import { callExternalApi } from "./api.service";
import { Patient } from "../interfaces/patient";
import { LoginForm } from "../interfaces/loginForm";

const apiServerUrl = "http://localhost:8080";

export const login = async (payload: LoginForm) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/auth/login`,
    method: "POST",
    data: payload,
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Patient | null; error: string | Error | null };

  return {
    data,
    error,
  };
};
