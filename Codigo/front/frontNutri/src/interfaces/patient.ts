export interface Patient {
  id?: number;
  name: string;
  email: string;
  birthDate: string;
  occupation: string;
  goal: string;
  adress: {
    zip: string;
    state: string;
    city: string;
    district: string;
    street: string;
    country: string;
  };
}
