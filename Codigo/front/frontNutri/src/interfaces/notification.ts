import { Patient } from "./patient";

export interface Notification
{
  id: number;
  title: string;
  description: string;
  patient: Patient
}