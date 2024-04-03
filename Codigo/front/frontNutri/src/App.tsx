import { useState } from 'react';
import  SiderComponent from './components/SiderComponent';
import { RoutesApplication } from './Routes';
import PatientRegistration from './components/PatientRegistration';
import Login from '../src/components/Login/Login';

function App() {
  return (
    <div>
      <div>
        <PatientRegistration />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default App;
