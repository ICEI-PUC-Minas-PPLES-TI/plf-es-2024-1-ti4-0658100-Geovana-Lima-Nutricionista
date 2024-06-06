import React from "react";
import { Typography, notification, Form, FormInstance } from "antd";
import { useNavigate } from "react-router";
import { createPatient } from "../services/patient.service";
import SiderComponent from "../components/SiderComponent";
import { PatientFormRegister } from "../components/PatientFormRegister";
import "../index.css";

export const CreatePatient = () => {
  document.title = "Cadastro de Pacientes";
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (formInstance: any) => {
    const formData = formInstance.getFieldsValue();
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
    console.log("Patient Data: ", patientData);

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
        <div className="form-container">
          <Form
            form={form}
            autoComplete="off"
            labelWrap
            layout="vertical"  
            onFinish={() => onFinish(form)}
          >
              <Typography.Title className="title">
                Cadastro do Paciente
              </Typography.Title>
              <PatientFormRegister form={form} />
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};
