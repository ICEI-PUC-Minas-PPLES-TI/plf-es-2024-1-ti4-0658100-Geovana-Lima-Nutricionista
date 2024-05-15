import { Patient } from "./patient";
import { RecordProps } from "./record";

export interface Appointment {
  id?: number;
  date: string;
  hour: string;
  price: string;
  status: string;
  paymentLink: string;
  patient?: Patient
}