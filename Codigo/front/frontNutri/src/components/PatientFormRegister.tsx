import { Row, Col, Form, Input, DatePicker, Divider, Select, Button } from 'antd'
import { useEffect, useState } from 'react'
import { getStates, getCitiesByState } from "../services/ibge.service";
import '../index.css';

const { Option } = Select;

interface Estado {
    sigla: string;
    nome: string;
  }
  
interface Cidade {
    id: number;
    nome: string;
  }

  

export const PatientFormRegister = () => {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

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
    <div>
            <Row gutter={24}>
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  name="birthDate"
                  label="Data de Nascimento"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor digite a data de nascimento do paciente",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100% " }}
                    picker="date"
                    placeholder="Escreva a data de nascimento do paciente"
                    format="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input
                    placeholder="Escreva o objetivo do paciente"
                  />
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
                  <Input placeholder="Escreva o cep do paciente" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="Estado"
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecione o estado do paciente",
                    },
                  ]}
                >
                  <Select
                    placeholder="Selecione o estado"
                    onChange={handleChangeEstado}
                  >
                    {estados.map((estado) => (
                      <Option key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </Option>
                    ))}
                  </Select>
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
                      message: "Por favor selecione a cidade do paciente",
                    },
                  ]}
                >
                  <Select
                    placeholder="Selecione a cidade"
                    disabled={!estadoSelecionado}
                  >
                    {cidades.map((cidade) => (
                      <Option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </Option>
                    ))}
                  </Select>
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
                <Form.Item
                  name="country"
                  label="País"
                  initialValue={"Brasil"}
                >
                  <Input disabled={true} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                className="button"
              >
                Cadastrar
              </Button>
            </Form.Item>
    </div>
  )
}
