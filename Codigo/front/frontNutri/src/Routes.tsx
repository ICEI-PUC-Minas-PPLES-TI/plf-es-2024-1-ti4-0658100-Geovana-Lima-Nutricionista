import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './components/PatientsList';
import { CreatePatient } from './pages/create-patient-page';

export const RoutesComponent = () => (
    <Routes>
        <Route path="/add-new-patient" element={<CreatePatient />} />
         <Route path="/check-patient" element={<PatientsList />} />
    </Routes>
  );


