import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import { CreateConsultation } from './pages/create-consultation-page';
import Login from './components/Login';

export const RoutesComponent = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CreatePatient />} />
        <Route path="/busca" element={<PatientsList />} />
        <Route path="/cadastroConsulta" element={<CreateConsultation />} />
    </Routes>
  );


