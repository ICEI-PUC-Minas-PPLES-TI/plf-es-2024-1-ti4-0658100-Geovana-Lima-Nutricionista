import { Moment } from "moment";

export interface AppointmentForm {
    patientId: number;
    date: string;
    hour: Moment;
    price: string;
  }
  