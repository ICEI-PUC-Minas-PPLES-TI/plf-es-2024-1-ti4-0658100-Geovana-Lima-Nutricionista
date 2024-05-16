import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  TimePicker,
  notification,
  Select,
} from "antd";
import "../index.css";
import "moment/locale/pt-br";
import moment from "moment";
import "../index.css";
import { getPatients } from "../services/patient.service";
import { useEffect, useState } from "react";
import { Patient } from "../interfaces/patient";
import { Option } from "antd/es/mentions";

export const AppointmentRegistration = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

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
    <div>
      {/* Nome do paciente */}
      <Row gutter={24}>
        <Col span={24}>
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
              placeholder="Digite o nome do paciente"
            >
              {patients.map((patient) => (
                <Option key={patient.id?.toString()} value={patient.id?.toString()}>
                  {patient.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Data da Consulta */}
        <Col span={24}>
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
                  if (!value || value.isAfter(moment(), "day")) {
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
              style={{ width: "100% " }}
              picker="date"
              placeholder="Escreva a data da consulta do paciente"
              format="YYYY-MMM-DD"
            />
          </Form.Item>
        </Col>
        </Row>
        {/* Hora da Consulta */}
        <Row gutter={24}>
          <Col span={24}>
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
                format="HH:mm"
                placeholder="Selecione a hora da consulta"
              />
            </Form.Item>
          </Col>
        </Row>
      <Row gutter={24}>
        <Col span={24}>
          {/* Valor da Consulta */}
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
            />
          </Form.Item>
        </Col>

        {/* Botão Link de pagamento */}
        <div>
        <Row gutter={24} justify="center">
          <Col span={24} offset={12}>
            <Button type="primary" style={}>
              Link de pagamento
            </Button>
          </Col>
        </Row>
        </div>
      </Row>
      {/* Botão Criar nova consulta */}
      <div className="create-appointment-button">
        <Button type="primary" htmlType="submit" className="button">
          Criar nova consulta
        </Button>
      </div>
    </div>
  );
};
