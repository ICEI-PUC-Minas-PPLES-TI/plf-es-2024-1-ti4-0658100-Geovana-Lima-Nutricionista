import React from 'react';
import { Route, Routes } from 'react-router-dom';
import  PatientRegistration  from './components/PatientRegistration';
import  Login  from './components/Login/Login';

export const RoutesApplication = () => {
    return (
        <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/add-new-patient" element={<PatientRegistration />} />
                <Route path="/check-patient" element={<div>"teste"</div>} />
                <Route path="/profile" element={<div>"profile"</div>} />
                <Route path="/add-new-event" element={<div>"add-new-event"</div>} />
                <Route path="/check-schedule" element={<div>"check-schedule"</div>} />
                <Route path="/home" element={<div>"home"</div>} />
        </Routes>
    );
};