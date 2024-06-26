import { AxiosRequestConfig } from "axios";
import { callExternalApi } from "./api.service";
import { Patient, PatientSearchParams } from "../interfaces/patient";

const apiServerUrl = "http://52.14.12.151:8080";

export const createPatient = async (patient: Patient) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/patient`,
    method: "POST",
    data: patient,
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Patient | null; error: string | null };

  return {
    data,
    error,
  };
};

export const getPatients = async (params: PatientSearchParams) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/patient`,
    method: "GET",
    params
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Array<Patient> | null; error: string | null };

  return {
    data,
    error,
  };
};

export const deletePatient = async (patientId: number) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/patient/${patientId}`,
    method: "DELETE",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Patient | null; error: string | null };

  return {
    data,
    error,
  };
};

export const updatePatient = async (patientId: number, patient: Patient) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/patient/${patientId}`,
    method: "PUT",
    data: patient,
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Patient | null; error: string | null };

  return {
    data,
    error,
  };
};

export const getPatient = async (patientId: number) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/patient/${patientId}`,
    method: "GET",
  };

  const { data, error } = (await callExternalApi({
    config,
  })) as { data: Patient ; error: string | null };

  return {
    data,
    error,
  };
};
