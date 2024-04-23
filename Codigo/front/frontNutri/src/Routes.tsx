import {  Route, Routes } from 'react-router-dom';
import { PatientsList } from './pages/list-patients-page';
import { CreatePatient } from './pages/create-patient-page';
import Login from './components/Login';
import { Patientspage } from './components/PatientPage';
export const RoutesComponent = () => (
    <Routes>
        <Route path="/add-new-patient" element={<CreatePatient />} />
         <Route path="/check-patient" element={<PatientsList />} />
         <Route path="/login" element={<Login />} />
         <Route path="/see-patient" element={<Patientspage />} />
    </Routes>
  );


