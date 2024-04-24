import axios from 'axios';

import { RecordProps } from '../interfaces/Record';

const apiServerUrl = 'http://localhost:8080/api';

export const createPatientRecord = async (patientRecordDTO:RecordProps) => {
  try {
    const response = await axios.post(`${apiServerUrl}/patient-records`, patientRecordDTO);
    return response.data;
} catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const getAllPatientRecords = async () => {
  try {
    const response = await axios.get(`${apiServerUrl}/patient-records`);
    return response.data;
} catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const getPatientRecord = async (id:number) => {
  try {
    const response = await axios.get(`${apiServerUrl}/patient-records/${id}`);
    return response.data;
} catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};
export const getPatientRecordPatient = async (id:number) => {
  try {
    const response = await axios.get(`${apiServerUrl}/patient-records/patient/${id}`);
    return response.data;
} catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const updatePatientRecord = async (id:number, patientRecordDTO:RecordProps) => {
  try {
    const response = await axios.put(`${apiServerUrl}/patient-records/${id}`, patientRecordDTO);
    return response.data;
} catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const deletePatientRecord = async (id:number) => {
  try {
    await axios.delete(`${apiServerUrl}/patient-records/${id}`);
  } catch (error:any) {
    throw new Error(error.response.data.message || error.message);
  }
};
