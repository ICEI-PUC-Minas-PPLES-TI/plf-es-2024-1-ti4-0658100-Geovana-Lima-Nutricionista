import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import { CreateConsultation } from './pages/create-consultation-page';
import Login from './components/Login';
import { Patientspage } from './components/PatientPage';
export const RoutesComponent = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add-new-patient" element={<CreatePatient />} />
        <Route path="/check-patient" element={<PatientsList />} />
        <Route path="/cadastroConsulta" element={<CreateConsultation />} />
        <Route path="/see-patient" element={<Patientspage />} />
    </Routes>
  );


