import {  Route, Routes } from 'react-router-dom';
import PatientRegistration from './components/PatientRegistration'; 
import { PatientsList } from './components/PatientsList';

export const RoutesComponent = () => (
    <Routes>
        <Route path="/add-new-patient" element={<PatientRegistration initialValues={{
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
               
            }} onSubmit={function (_values: any): void {
                throw new Error('Function not implemented.');
            } } onCancel={function (): void {
                throw new Error('Function not implemented.');
            } } />} />
         <Route path="/check-patient" element={<PatientsList />} />
    </Routes>
  );


