import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import { CreateConsultation } from './pages/create-consultation-page';
import Login from './components/Login';
import { Patientspage } from './components/PatientPage';
export const RoutesComponent = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/:id" element={<Patientspage />} />
        <Route path="/appointments/create" element={<CreateConsultation />} />
    </Routes>
  );


