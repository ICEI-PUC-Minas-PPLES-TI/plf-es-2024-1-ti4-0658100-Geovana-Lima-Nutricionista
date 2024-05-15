import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";
import { Form, notification } from "antd";
import { createAppointment } from "../services/appointment.service";
import { AppointmentForm } from "../interfaces/appointmentForms";
import SiderComponent from "../components/SiderComponent";
import { AppointmentRegistration } from "../components/AppointmentRegistration";
import moment from "moment";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const CreateAppointment = () => {
  document.title = "Cadastro de Consultas";
  const navigate = useNavigate();

  const onFinish = async (formData: AppointmentForm) => {
    console.log(formData.hour);
    const formattedDate = moment(formData.date).format("YYYY-MM-DD");
    const formattedHour = (formData.hour).format("HH:mm");

    formData.date = formattedDate;

    const objData = {...formData, hour: formattedHour}

    const { data, error } = await createAppointment(objData);
    if (data) {
      notification.success({
        message: "Consulta cadastrada com sucesso!",
      });
      navigate("/patients");
    }
    if (error) {
      console.log(error);
      notification.error({
        message: error ?? "Erro ao cadastrar nova consulta!",
      });
    }
  };

  return (
    <>
      <SiderComponent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Form
            autoComplete="off"
            labelWrap
            {...formItemLayout}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
          >
            <div>
              <Title style={{ textAlign: "center" }}>
                Cadastro da Consulta
              </Title>
              <AppointmentRegistration />
            </div>
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};
