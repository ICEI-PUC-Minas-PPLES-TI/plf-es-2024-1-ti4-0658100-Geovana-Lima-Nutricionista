import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import Login from './components/Login';
import { Patientspage } from './components/PatientPage';
import { CreateAppointment } from './pages/create-appointment-page';
import { CalendarPage } from './pages/calendar-page';
export const RoutesComponent = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients/:id" element={<Patientspage />} />
        <Route path="/appointments" element={<CalendarPage />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
    </Routes>
  );


