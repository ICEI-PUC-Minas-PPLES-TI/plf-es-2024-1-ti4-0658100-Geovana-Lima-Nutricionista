import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  TimePicker,
  notification,
  Select,
  ConfigProvider,
} from "antd";
import "moment/locale/pt-br";
import moment from "moment";
import "../index.css";
import { getPatients } from "../services/patient.service";
import { Patient } from "../interfaces/patient";
import locale from "antd/lib/locale/pt_BR";
import { createAppointment } from "../services/appointment.service";
import { useNavigate } from "react-router";
import { AppointmentForm } from "../interfaces/appointmentForms";

const { Option } = Select;

interface AppointmentRegistrationProps {
  patientId?: number;
}

export const AppointmentRegistration: React.FC<
  AppointmentRegistrationProps
> = ({ patientId }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form] = Form.useForm();
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
      navigate("/appointments");
    } else if (error) {
      console.log(error);
      notification.error({
        message: error ?? "Erro ao cadastrar nova consulta!",
      });
    }
  };

  useEffect(() => {
    fetchPatients("");
  }, []);

  useEffect(() => {
    if (patientId && patients.length > 0) {
      form.setFieldsValue({ patientId: patientId.toString() });
    }
  }, [patientId, patients, form]);

  const fetchPatients = async (value: string) => {
    const { data, error } = await getPatients({
      page: 1,
      per_page: 10,
      patient_name: value,
    });

    if (data) {
      setPatients(data);
    }

    if (error) {
      notification.error({
        message: "Erro ao buscar pacientes!",
      });
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="patientId"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor escreva o nome do paciente",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={false}
              onSearch={fetchPatients}
              notFoundContent={null}
              size="large"
              placeholder="Digite o nome do paciente"
              style={{ width: "100%" }}
              className="select"
            >
              {patients.map((patient) => (
                <Option
                  key={patient.id?.toString()}
                  value={patient.id?.toString()}
                >
                  {patient.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Data da Consulta"
            rules={[
              {
                required: true,
                message: "Por favor digite a data da consulta do paciente",
              },
              () => ({
                validator(_, value) {
                  if (!value || value.isAfter(moment().endOf("day")) || value.isSame(moment().startOf("day"))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("A data da consulta deve ser no futuro")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              size="large"
              placeholder="Escreva a data da consulta do paciente"
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <Form.Item
            name="hour"
            label="Hora da Consulta"
            rules={[
              {
                required: true,
                message: "Por favor digite a hora da consulta do paciente",
              },
            ]}
          >
            <TimePicker
              size="large"
              format="HH:mm"
              placeholder="Selecione a hora da consulta"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Valor da Consulta"
            rules={[
              {
                required: true,
                message: "Por favor digite o valor da consulta do paciente",
              },
              {
                pattern: /^\d+(\.\d{1,2})?$/, // Padrão para aceitar até 2 casas decimais
                message: "Por favor, insira um valor válido",
              },
            ]}
          >
            <Input
              placeholder="Escreva o valor da consulta do paciente"
              addonBefore="R$"
              maxLength={15} // Máximo de 15 caracteres, incluindo o "R$"
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="button" style={{ width: "100%", height: '50px', fontSize: '16px' }}>
              Criar nova consulta
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
