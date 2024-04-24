import { AxiosRequestConfig } from "axios";
import { callExternalApi } from "./api.service";
import { AppointmentForm } from "../interfaces/appointmentForms";
import { Appointment } from "../interfaces/appointment";

const apiServerUrl = "http://localhost:8080";

export const createAppointment = async (appointment: AppointmentForm) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/appointments`,
    method: "POST",
    data: appointment,
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Appointment | null; error: string | Error | null };

  return {
    data,
    error,
  };
};

export const getPatientAppointments = async (id: number) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/appointments/patient/${id}`,
    method: "GET",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Appointment[] | null; error: string | Error | null };

  return {
    data,
    error,
  };
}

