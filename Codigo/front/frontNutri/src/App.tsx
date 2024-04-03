
import { RoutesComponent } from './Routes';

function App() {
  return (
    
      <PatientRegistration initialValues={{
      name: '',
      email: '',
      birthDate: '',
      occupation: '',
      goal: '',
      adress: {
        zip: '',
        state: '',
        city: '',
        district: '',
        street: '',
        country: ''
      }
    }} onSubmit={function (values: any): void {
      throw new Error('Function not implemented.');
    } } onCancel={function (): void {
      throw new Error('Function not implemented.');
    } } />
  
  );
}

export default App;
