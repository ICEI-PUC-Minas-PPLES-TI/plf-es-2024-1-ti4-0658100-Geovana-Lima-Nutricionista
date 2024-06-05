import { useParams } from "react-router";
import { Typography } from "antd";
import SiderComponent from "../components/SiderComponent";
import { AppointmentRegistration } from "../components/AppointmentRegistration";
import '../index.css';

export const CreateAppointment = () => {
  document.title = "Cadastro de Consultas";
  const { id } = useParams<{ id?: string }>();

  return (
    <SiderComponent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Typography.Title className="title" style={{ textAlign: "center" }}>
            Cadastro da Consulta
          </Typography.Title>
          <AppointmentRegistration patientId={id ? Number(id) : undefined}/>
        </div>
      </div>
    </SiderComponent>
  );
};
