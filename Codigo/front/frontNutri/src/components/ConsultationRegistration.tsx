import { Row, Col, Form, Input, DatePicker, Button, TimePicker } from "antd";
import "../index.css";
import "moment/locale/pt-br";
import moment from "moment";
import "../index.css";
import { getPatients } from "../services/patient.service";

export const ConsultationRegistration = () => {
  const searchPatient = async (value: string) => {
    const {data, error} = await getPatients();
  };

  return (
    <div>
      {/* Nome do paciente */}
      <Row gutter={24}>
        <Col span={18}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor escreva o nome do paciente",
              },
            ]}
          >
            <Input placeholder="Escreva o nome do paciente" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* Data da Consulta */}
        <Col span={12}>
          <Form.Item
            name="consultationDate"
            label="Data da Consulta"
            rules={[
              {
                required: true,
                message: "Por favor digite a data da consulta do paciente",
              },
              () => ({
                validator(_, value) {
                  if (!value || value.isBefore(moment(), "day")) {
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
              format="DD-MM-YYYY"
            />
          </Form.Item>
        </Col>
        {/* Hora da Consulta */}
        <Row gutter={24}>
          <Col span={-1}>
            <Form.Item
              name="consultationTime"
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
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          {/* Valor da Consulta */}
          <Form.Item
            name="value"
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
          <Col span={12} style={{ textAlign: "left" }}>
            <Button type="primary" className="button">
              Link de pagamento
            </Button>
          </Col>
        </div>
      </Row>
      {/* Botão Criar nova consulta */}
      <div className="create-consultation-button">
        <Button type="primary" className="button">
          Criar nova consulta
        </Button>
      </div>
    </div>
  );
};
