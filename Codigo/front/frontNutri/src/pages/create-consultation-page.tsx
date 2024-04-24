import { useNavigate } from "react-router";
import Title from "antd/es/typography/Title";
import { Form, notification } from "antd";
import { createConsultation } from "../services/consultation.service";
import SiderComponent from "../components/SiderComponent";
import { ConsultationForm } from "../interfaces/consultationForms";
import { ConsultationRegistration } from "../components/ConsultationRegistration";

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

export const CreateConsultation = () => {
  document.title = "Cadastro de Consultas";
  const navigate = useNavigate();

  const onFinish = async (formData: ConsultationForm) => {
    const consultationData = {
      name: formData.name,
      consultationDate: formData.consultationDate,
      consultationTime: formData.consultationTime,
      value: formData.value,
      }
    const { data, error } = await createConsultation(consultationData);
    if (data) {
      notification.success({
        message: "Consulta cadastrada com sucesso!",
      });
      navigate("/patients");
    }
    if (error) {
      notification.error({
        message: "Erro ao cadastrar nova consulta!",
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
              <ConsultationRegistration />
            </div>
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};
