import { useNavigate, useParams } from "react-router";
import { Typography, notification } from "antd";
import SiderComponent from "../components/SiderComponent";
import { AppointmentRegistration } from "../components/AppointmentRegistration";
import '../index.css';
import { createAppointment } from "../services/appointment.service";
import { AppointmentForm } from "../interfaces/appointmentForms";
import { FormattedAppointment } from "../interfaces/formattedAppointment";

export const CreateAppointment = () => {
  document.title = "Cadastro de Consultas";
  const navigate = useNavigate();

  const onFinish = async (formData: AppointmentForm) => {
    console.log(formData);
    const formattedDate = formData.date.format("YYYY-MM-DD");
    const formattedHour = formData.hour.format("HH:mm");

    const objData: FormattedAppointment = { 
      date: formattedDate, 
      hour: formattedHour, 
      patientId: formData.patientId,
      price: formData.price,
      paid: formData.paid,
    };

    const { data, error } = await createAppointment(objData);
    if (data) {
      notification.success({
        message: "Consulta cadastrada com sucesso!",
      });
      navigate("/appointments");
    } else if (error) {
      console.log(error);
      notification.error({
        message: error ?? "Erro ao cadastrar nova consulta!",
      });
    }
  };

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
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <Typography.Title className="title" style={{ textAlign: "center" }}>
            Cadastro da Consulta
          </Typography.Title>
          <AppointmentRegistration/>
        </div>
      </div>
    </SiderComponent>
  );
};