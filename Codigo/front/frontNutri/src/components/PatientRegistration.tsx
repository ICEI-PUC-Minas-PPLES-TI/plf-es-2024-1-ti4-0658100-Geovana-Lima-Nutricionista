import React, { useState, useEffect } from "react";
import { Form, notification, Select } from "antd";
import Title from "antd/es/typography/Title";
import "../index.css";
import { createPatient } from "../services/patient.service";
import { PatientForm } from "../interfaces/patientForms";
import { getStates, getCitiesByState } from "../services/ibge.service";
import { PatientFormModal } from "./PatientFormModal";
import { PatientFormRegister } from "./PatientFormRegister";
import PatientData from "./Mock";
import SiderComponent from "./SiderComponent";
import { useNavigate } from "react-router";

const { Option } = Select;

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

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

interface PatientRegistrationProps {
  initialValues?: {
    name: string;
    email: string;
    birthDate: string;
    occupation: string;
    goal: string;
    adress: {
      zip: string;
      state: string;
      city: string;
      district: string;
      street: string;
      country: string;
    };
  };
  isInModal?: boolean;
  onSubmit: (values: PatientForm) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isInModal,
  isEditing = false,
}) => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
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

  useEffect(() => {
    const fetchEstados = async () => {
      const estadosData = await getStates();
      setEstados(estadosData);
    };

    fetchEstados();
  }, []);

  const handleChangeEstado = async (estado: string) => {
    setEstadoSelecionado(estado);
    setCidadeSelecionada("");

    const cidadesData = await getCitiesByState(estado);
    setCidades(cidadesData);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "auto",
        }}
      >
        <Form
          autoComplete="off"
          labelWrap
          {...formItemLayout}
          style={{ maxWidth: isInModal ? "100%" : 600 }}
          onFinish={onFinish}
        >
          {isInModal && (
            <PatientFormModal
              initialValues={{
                name: "",
                email: "",
                birthDate: "",
                occupation: "",
                goal: "",
                adress: {
                  zip: "",
                  state: "",
                  city: "",
                  district: "",
                  street: "",
                  country: "",
                },
              }}
              onSubmit={function (values: any): void {
                throw new Error("Function not implemented.");
              }}
              onCancel={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        </Form>
      </div>

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
            {!isInModal && (
              <div>
                <Title style={{ textAlign: "center" }}>
                  Cadastro do Paciente
                </Title>
                <PatientFormRegister />
              </div>
            )}
          </Form>
        </div>
      </SiderComponent>
    </>
  );
};

export default PatientRegistration;
