import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";
import { PatientForm } from "../interfaces/patientForms";
import { Form, Typography, notification } from "antd";
import { createPatient } from "../services/patient.service";
import SiderComponent from "../components/SiderComponent";
import { PatientFormRegister } from "../components/PatientFormRegister";
import '../index.css';

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

export const CreatePatient = () => {
  document.title = "Cadastro de Pacientes";
  const navigate = useNavigate();

  const onFinish = async (formData: PatientForm) => {
    const patientData = {
      name: formData.name,
      email: formData.email,
      birthDate: formData.birthDate,
      occupation: formData.occupation,
      goal: formData.goal,
      address: {
        zip: formData.zip,
        state: formData.state,
        city: formData.city,
        district: formData.district,
        street: formData.street,
        country: formData.country,
      },
    };
    const { data, error } = await createPatient(patientData);
    if (data) {
      notification.success({
        message: "Paciente cadastrado com sucesso!",
      });
      navigate("/patients");
    }
    if (error) {
      notification.error({
        message: "Erro ao cadastrar paciente!",
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
            paddingBottom:'20px',
            minHeight: "40vh",
            overflow:"hidden",
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
              <Typography.Title className="title" style={{ textAlign: "center" }}>
                Cadastro do Paciente
              </Typography.Title>
              <PatientFormRegister onFinish={onFinish} />
            </div>
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};