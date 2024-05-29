import { useNavigate } from "react-router";
import { Form, Typography, notification } from "antd";
import { createAppointment } from "../services/appointment.service";
import { AppointmentForm } from "../interfaces/appointmentForms";
import SiderComponent from "../components/SiderComponent";
import { AppointmentRegistration } from "../components/AppointmentRegistration";
import moment from "moment";
import '../index.css';

export const CreateAppointment = () => {
  document.title = "Cadastro de Consultas";
  const navigate = useNavigate();

  const onFinish = async (formData: AppointmentForm) => {
    console.log(formData);
    const formattedDate = formData.date.format("YYYY-MM-DD");
    const formattedHour = formData.hour.format("HH:mm");

    formData.date = formattedDate;

    const objData = { ...formData, hour: formattedHour };

    const { data, error } = await createAppointment(objData);
    if (data) {
      notification.success({
        message: "Consulta cadastrada com sucesso!",
      });
      navigate("/patients");
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
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Typography.Title className="title" style={{ textAlign: "center" }}>
            Cadastro da Consulta
          </Typography.Title>
          <AppointmentRegistration onFinish={onFinish} />
        </div>
      </div>
    </SiderComponent>
  );
};
