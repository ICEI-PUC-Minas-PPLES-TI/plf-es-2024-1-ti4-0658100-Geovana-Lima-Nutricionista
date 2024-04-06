import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";
import { PatientForm } from "../interfaces/patientForms";
import { Form, notification } from "antd";
import { createPatient } from "../services/patient.service";
import SiderComponent from "../components/SiderComponent";
import { PatientFormRegister } from "../components/PatientFormRegister";

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
      navigate("/check-patient");
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
                Cadastro do Paciente
              </Title>
              <PatientFormRegister />
            </div>
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};
