import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './components/PatientsList';
import { CreatePatient } from './pages/create-patient-page';
import Login from './components/Login';

export const RoutesComponent = () => (
    <Routes>
        <Route path="/add-new-patient" element={<CreatePatient />} />
         <Route path="/check-patient" element={<PatientsList />} />
         <Route path="/login" element={<Login />} />
    </Routes>
  );


