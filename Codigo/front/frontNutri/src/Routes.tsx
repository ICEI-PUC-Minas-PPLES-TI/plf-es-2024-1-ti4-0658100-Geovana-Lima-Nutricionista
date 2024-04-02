import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import SiderComponent from './components/SiderComponent';
import PatientRegistration from './components/PatientRegistration'; 
import { PatientsList } from './components/PatientsList';

export const RoutesComponent = () => (
   <BrowserRouter basename='/' >
    <Routes>
        <Route path="add-new-patient" element={<PatientRegistration initialValues={{
                name: '',
                email: '',
                birthDate: '',
                occupation: '',
                goal: '',
                zip: '',
                state: '',
                city: '',
                district: '',
                street: '',
                country: ''
            }} onSubmit={function (values: any): void {
                throw new Error('Function not implemented.');
            } } onCancel={function (): void {
                throw new Error('Function not implemented.');
            } } />} />
        {/* Adicione mais rotas aqui, se necessário */}
    </Routes>
    </BrowserRouter> 
  );


// export const RoutesApplication = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<SiderComponent />}>
//                 <Route
//                     path="add-new-patient"
//                     element={<PatientRegistration
//                                 initialValues={{
//                                     name: '',
//                                     email: '',
//                                     birthDate: '',
//                                     occupation: '',
//                                     goal: '',
//                                     zip: '',
//                                     state: '',
//                                     city: '',
//                                     district: '',
//                                     street: '',
//                                     country: ''
//                                 }}
//                                 onSubmit={(values) => console.log(values)} // Defina a função onSubmit
//                                 onCancel={() => console.log('Cancel')} // Defina a função onCancel
//                             />}
//                 />
//                 <Route path="check-patient" element={<PatientsList/>} />
//                 <Route path="profile" element={<div>"profile"</div>} />
//                 <Route path="/add-new-event" element={<div>"add-new-event"</div>} />
//                 <Route path="/check-schedule" element={<div>"check-schedule"</div>} />
//                 <Route path="/home" element={<div>"home"</div>} />
//             </Route>
//         </Routes>
//     );
// };
