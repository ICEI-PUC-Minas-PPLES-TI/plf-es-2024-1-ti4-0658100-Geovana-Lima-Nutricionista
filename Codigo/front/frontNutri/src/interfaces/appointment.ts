import { RecordProps } from "./record";

export interface Appointment {
  id?: number;
  date: string;
  hour: string;
  price: string;
  status: string;
  paymentLink: string;
}

    id?: number;
    date: string;
    hour: string;
    price: string;
    status: string;
    paymentLink: string;
    record: RecordProps|null;
    patientId?: number;
  }
