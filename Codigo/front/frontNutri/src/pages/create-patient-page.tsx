import PatientRegistration from "../components/PatientRegistration"
import { PatientForm } from "../interfaces/patientForms"
import { createPatient } from "../services/patient.service";


export const CreatePatient = () => {

  const onSubmit = async (values: PatientForm) => {
    const patientData = {
      name: values.name,
      email: values.email,
      birthDate: values.birthDate,
      occupation: values.occupation,
      goal: values.goal,
      adress: {
        zip: values.zip,
        state: values.state,
        city: values.city,
        district: values.district,
        street: values.street,
        country: values.country,
      },
    };

    const { data, error } = await createPatient(patientData);
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  }

  return (
    <PatientRegistration onSubmit={onSubmit} onCancel={() => {}} isEditing={false} />
  )
}