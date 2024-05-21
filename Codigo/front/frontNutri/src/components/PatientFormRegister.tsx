import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Divider,
  Button,
  ConfigProvider,
} from "antd";
import { useState, useEffect } from "react";
import { getCEPInfo } from "../services/ibge.service";
import "../index.css";
import "moment/locale/pt-br";
import moment from "moment";
import locale from "antd/lib/locale/pt_BR";
import { cep as CepInterface } from "../interfaces/cep";
import { PatientForm } from "../interfaces/patientForms";

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

export const PatientFormRegister = ({
  onFinish,
}: {
  onFinish: (FormData: PatientForm) => Promise<void>;
}) => {
  const [cep, setCep] = useState<CepInterface>();
  const [form] = Form.useForm();

  const searchCEP = async (value: string) => {
    if (value.length < 8) return;
    const { data } = await getCEPInfo(value);

    if (data) {
      setCep(data);
    }
  };

  useEffect(() => {
    if (cep) {
      form.setFieldsValue({
        ...form,
        state: cep.uf,
        city: cep.localidade,
        district: cep.bairro,
        street: cep.logradouro,
      });
    }
  }, [cep, form]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <div>
        <Row gutter={24}>
          <Col span={24}>
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
          <Col span={24}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Por favor digite um e-mail válido",
                },
              ]}
            >
              <Input placeholder="Escreva o e-mail do paciente" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <ConfigProvider locale={locale}>
              <Form.Item
                name="birthDate"
                label="Data de Nascimento"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor digite a data de nascimento do paciente",
                  },
                  () => ({
                    validator(_, value) {
                      if (!value || value.isBefore(moment(), "day")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("A data de nascimento deve ser no passado")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  picker="date"
                  placeholder="Escreva a data de nascimento do paciente"
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
          <Col span={24}>
            <Form.Item
              name="occupation"
              label="Ocupação"
              rules={[
                {
                  required: true,
                  message: "Por favor digite a ocupação do paciente",
                },
              ]}
            >
              <Input placeholder="Escreva a ocupação do paciente" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="goal"
              label="Objetivo"
              rules={[
                {
                  required: true,
                  message: "Por favor digite o objetivo do paciente",
                },
              ]}
            >
              <Input placeholder="Escreva o objetivo do paciente" />
            </Form.Item>
          </Col>
        </Row>
        <Divider>Endereço</Divider>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="zip"
              label="CEP"
              rules={[
                {
                  required: true,
                  message: "Por favor digite o CEP do paciente",
                },
              ]}
            >
              <Input
                onChange={(e) => searchCEP(e.target.value)}
                placeholder="Escreva o cep do paciente"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="state"
              label="Estado"
              rules={[
                {
                  required: true,
                  message: "Por favor digite o estado do paciente",
                },
              ]}
            >
              <Input placeholder="Por favor digite o estado do paciente" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="city"
              label="Cidade"
              rules={[
                {
                  required: true,
                  message: "Por favor digite a cidade do paciente",
                },
              ]}
            >
              <Input placeholder="Por favor digite a cidade do paciente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district"
              label="Bairro"
              rules={[
                {
                  required: true,
                  message: "Por favor digite o bairro do paciente",
                },
              ]}
            >
              <Input placeholder="Escreva o bairro do paciente" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="street"
              label="Rua"
              rules={[
                {
                  required: true,
                  message: "Por favor digite a rua do paciente",
                },
              ]}
            >
              <Input placeholder="Escreva o endereço do paciente" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="country" label="País" initialValue={"Brasil"}>
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>

        <div className="create-patient-button">
          <Button htmlType="submit" type="primary" className="button">
            Cadastrar
          </Button>
        </div>
      </div>
    </Form>
  );
};
