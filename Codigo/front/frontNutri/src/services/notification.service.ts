import { AxiosRequestConfig } from "axios";
import { callExternalApi } from "./api.service";
import { Notification } from "../interfaces/notification";

const apiServerUrl = "http://52.14.12.151:8080";

export const getNotifications = async () => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/notifications`,
    method: "GET",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Array<Notification> | null; error: string | null };

  return {
    data,
    error,
  };
};

export const deleteNotification = async (id: number) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/notifications/${id}`,
    method: "DELETE",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: null; error: string | null };

  return {
    data,
    error,
  };
}
