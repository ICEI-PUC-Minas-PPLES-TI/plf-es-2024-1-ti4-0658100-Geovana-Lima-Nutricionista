import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, DatePicker, Button, TimePicker, notification, Select, ConfigProvider } from "antd";
import "moment/locale/pt-br";
import moment from "moment";
import "../index.css";
import { getPatients } from "../services/patient.service";
import { Patient } from "../interfaces/patient";
import locale from 'antd/lib/locale/pt_BR';

const { Option } = Select;

interface AppointmentRegistrationProps {
  onFinish: (values: any) => void;
}

export const AppointmentRegistration: React.FC<AppointmentRegistrationProps> = ({ onFinish }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPatients("");
  }, []);

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
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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
            >
              {patients.map((patient) => (
                <Option key={patient.id?.toString()} value={patient.id?.toString()}>
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
                  if (!value || value.isAfter(moment().endOf('day'))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("A data da consulta deve ser no futuro"));
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
                pattern: /^\d+(\.\d{1,2})?$/, // padrão para aceitar até 2 casas decimais
                message: "Por favor, insira um valor válido",
              },
            ]}
          >
            <Input
              placeholder="Escreva o valor da consulta do paciente"
              addonBefore="R$"
              maxLength={15} // máximo de 15 caracteres, incluindo o "R$"
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="button" style={{ width: "100%" }}>
              Criar nova consulta
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};
