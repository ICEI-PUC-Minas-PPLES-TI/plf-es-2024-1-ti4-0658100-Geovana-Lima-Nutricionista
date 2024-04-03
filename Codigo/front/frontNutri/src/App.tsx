import { useState } from 'react';
import  SiderComponent from './components/SiderComponent';
import { RoutesComponent } from './Routes';
import PatientRegistration from './components/PatientRegistration';
import { PatientsList } from './components/PatientsList';
function App() {
  return (
    
      <PatientRegistration initialValues={{
      name: '',
      email: '',
      birthDate: '',
      occupation: '',
      goal: '',
      adress: {
        zip: '',
        state: '',
        city: '',
        district: '',
        street: '',
        country: ''
      }
    }} onSubmit={function (values: any): void {
      throw new Error('Function not implemented.');
    } } onCancel={function (): void {
      throw new Error('Function not implemented.');
    } } />
  
  );
}

export default App;
