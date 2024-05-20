import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import Login from './components/Login';
import { Patientspage } from './pages/PatientPage';
import { CreateAppointment } from './pages/create-appointment-page';
import { CalendarPage } from './pages/calendar-page';
import { HomePage } from './pages/homePage';

export const RoutesComponent = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients/:id" element={<Patientspage />} />
        <Route path="/appointments" element={<CalendarPage />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
    </Routes>
  );


