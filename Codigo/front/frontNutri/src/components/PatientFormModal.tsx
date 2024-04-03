import { Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getStates, getCitiesByState } from "../services/ibge.service";


const { Option } = Select;

interface Estado {
    sigla: string;
    nome: string;
  }
  
interface Cidade {
    id: number;
    nome: string;
  }

  interface PatientRegistrationProps {
    initialValues: {
      name: string;
      email: string;
      birthDate: string;
      occupation: string;
      goal: string;
      adress: {
        zip: string,
        state: string,
        city: string,
        district: string,
        street: string,
        country: string,
      };
    };
    isInModal?: boolean;
    onSubmit: (values: any) => void;
    onCancel: () => void;
    isEditing?: boolean;
  }
  

export const PatientFormModal:React.FC<PatientRegistrationProps> = ({
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
         <>
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
                  initialValue={initialValues?.name}
                >
                  <Input
                    placeholder="Escreva o nome do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
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
                  initialValue={initialValues?.email}
                >
                  <Input
                    placeholder="Escreva o e-mail do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
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
                  initialValue={moment(initialValues?.birthDate)}
                >
                  <DatePicker
                    style={{ width: "100% " }}
                    picker="date"
                    placeholder="Escreva a data de nascimento do paciente"
                    format="DD-MM-YYYY"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
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
                  initialValue={initialValues?.occupation}
                >
                  <Input
                    placeholder="Escreva a ocupação do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
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
                  initialValue={initialValues?.goal}
                >
                  <Input
                    placeholder="Escreva o objetivo do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider>Endereço</Divider>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="zip"
                  label="CEP"
                  rules={[
                    {
                      required: true,
                      message: "Por favor digite o CEP do paciente",
                    },
                  ]}
                  initialValue={initialValues?.adress?.zip}
                >
                  <Input
                    placeholder="Escreva o cep do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="state"
                  label="Estado"
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecione o estado do paciente",
                    },
                  ]}
                  initialValue={initialValues?.adress?.state}
                >
                  <Select
                    placeholder="Selecione o estado"
                    onChange={handleChangeEstado}
                    disabled={!isEditing}
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
              <Col span={24}>
                <Form.Item
                  name="city"
                  label="Cidade"
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecione a cidade do paciente",
                    },
                  ]}
                  initialValue={initialValues?.adress?.city}
                >
                  <Select
                    placeholder="Selecione a cidade"
                    disabled={!estadoSelecionado || !isEditing}
                  >
                    {cidades.map((cidade) => (
                      <Option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="district"
                  label="Bairro"
                  rules={[
                    {
                      required: true,
                      message: "Por favor digite o bairro do paciente",
                    },
                  ]}
                  initialValue={initialValues?.adress?.district}
                >
                  <Input
                    placeholder="Escreva o bairro do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="street"
                  label="Rua"
                  rules={[
                    {
                      required: true,
                      message: "Por favor digite a rua do paciente",
                    },
                  ]}
                  initialValue={initialValues?.adress?.street}
                >
                  <Input
                    placeholder="Escreva o endereço do paciente"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
    </div>
  )
}
