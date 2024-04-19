export interface Patient {
  id?: number;
  name: string;
  email: string;
  birthDate: string;
  occupation: string;
  goal: string;
  address: {
    zip: string;
    state: string;
    city: string;
    district: string;
    street: string;
    country: string;
  };
}

export interface PatientSearchParams
{
  page: number;
  per_page: number;
  patient_name?: string;
}
