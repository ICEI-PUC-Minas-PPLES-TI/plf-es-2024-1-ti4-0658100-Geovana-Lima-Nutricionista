import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import '../index.css';
import SiderComponent from './SiderComponent';

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
    initialValues: {
      name: string;
      email: string;
      birthDate: string;
      occupation: string;
      goal: string;
      zip: string;
      state: string;
      city: string;
      district: string;
      street: string;
      country: string;
    };
    isInModal?: boolean;
    onSubmit: (values: any) => void; 
    onCancel: () => void; 
    isEditing?: boolean;
  }



const PatientRegistration : React.FC<PatientRegistrationProps> = ({ initialValues, onSubmit, onCancel, isInModal,  isEditing = false, }) => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');


  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      }
    };

    fetchEstados();
  }, []);

  const handleChangeEstado = async (estado: string) => {
    setEstadoSelecionado(estado);
    setCidadeSelecionada('');

    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  return (
    <SiderComponent>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: isInModal ? 'auto' : '100vh',  }}>
    <Form autoComplete='off' labelWrap {...formItemLayout} style={{ maxWidth: isInModal ? '100%' : 600 }}>
      {isInModal && (
        <>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item 
                name="name" 
                label="Nome" 
                rules={[{ 
                  required: true, 
                  message: "Por favor escreva o nome do paciente" 
                }]}
                initialValue={initialValues.name}    
              >
                <Input placeholder='Escreva o nome do paciente' disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item 
                name="email" 
                label="E-mail"
                rules={[{ 
                  required: true, 
                  type: 'email', 
                  message: "Por favor digite um e-mail válido"
                }]}
                initialValue={initialValues.email}     
              >
                <Input placeholder='Escreva o e-mail do paciente' disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item 
                name="birthDate" 
                label="Data de Nascimento" 
                rules={[{ 
                  required: true,
                  message: "Por favor digite a data de nascimento do paciente" 
                }]}
                initialValue={moment(initialValues.birthDate)}     
              >
                <DatePicker  
                  style={{ width: "100% " }} 
                  picker='date' 
                  placeholder='Escreva a data de nascimento do paciente' 
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
                rules={[{ 
                  required: true,
                  message: "Por favor digite a ocupação do paciente"
                }]}
                initialValue={initialValues.occupation}      
              >
                <Input placeholder='Escreva a ocupação do paciente' disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
          <Form.Item
          name="goal"
          label="Objetivo"
          rules={[{
            required: true,
            message: "Por favor digite o objetivo do paciente"
          }]}
          initialValue={initialValues.goal}
        >
          <Input placeholder='Escreva o objetivo do paciente' disabled={!isEditing} />
        </Form.Item>
        </Col>
          </Row>

          <Divider>Endereço</Divider>

        <Row gutter={24}>
        <Col span={24}>
            <Form.Item
            name="zip"
            label="CEP"
            rules={[{
                required: true,
                message: "Por favor digite o CEP do paciente"
            }]}
            initialValue={initialValues.zip}
            >
            <Input placeholder='Escreva o cep do paciente' disabled={!isEditing} />
            </Form.Item>
        </Col>
          </Row>
        <Row gutter={24}>
        <Col span={24}>
            <Form.Item
            name="state"
            label="Estado"
            rules={[{
                required: true,
                message: "Por favor selecione o estado do paciente"
            }]}
            initialValue={initialValues.state}
            >
            <Select placeholder="Selecione o estado" onChange={handleChangeEstado} disabled={!isEditing} >
                {estados.map((estado) => (
                <Option key={estado.sigla} value={estado.sigla}>{estado.nome}</Option>
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
            rules={[{
                required: true,
                message: "Por favor selecione a cidade do paciente"
            }]}
            initialValue={initialValues.city}
            >
            <Select placeholder="Selecione a cidade" disabled={!estadoSelecionado || !isEditing} >
                {cidades.map((cidade) => (
                <Option key={cidade.id} value={cidade.nome}>{cidade.nome}</Option>
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
            rules={[{
                required: true,
                message: "Por favor digite o bairro do paciente"
            }]}
            initialValue={initialValues.district}
            >
            <Input placeholder='Escreva o bairro do paciente' disabled={!isEditing}  />
            </Form.Item>
        </Col>
        </Row>

        <Row gutter={24}>
        <Col span={24}>
            <Form.Item
            name="street"
            label="Rua"
            rules={[{
                required: true,
                message: "Por favor digite a rua do paciente"
            }]}
            initialValue={initialValues.name}
            >
            <Input placeholder='Escreva o endereço do paciente' disabled={!isEditing}  />
            </Form.Item>
        </Col>
        </Row>
        </>
      )}

      {!isInModal && (
        <>
          <Title style={{ textAlign: 'center' }}>Cadastro do Paciente</Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item 
                name="name" 
                label="Nome" 
                rules={[{ 
                    required: true, 
                    message: "Por favor escreva o nome do paciente" 
                    }]}
                  
                >
                <Input placeholder='Escreva o nome do paciente' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="email" 
                label="E-mail"
                rules={[{ 
                    required: true, 
                    type: 'email', 
                    message: "Por favor digite um e-mail válido"
                    }]}  
                >
                <Input placeholder='Escreva o e-mail do paciente' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
            <Form.Item 
                name="birthDate" 
                label="Data de Nascimento" 
                rules={[{ 
                    required: true,
                    message: "Por favor digite a data de nascimento do paciente" 
                }]}
                initialValue={moment(initialValues.birthDate, "DD-MM-YYYY")}     
                >
                <DatePicker  
                    style={{ width: "100% " }} 
                    picker='date' 
                    placeholder='Escreva a data de nascimento do paciente' 
                    format="DD-MM-YYYY"
                    disabled={!isEditing} 
                />
                </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="occupation"
                label="Ocupação" 
                rules={[{ 
                    required: true,
                    message: "Por favor digite a ocupação do paciente"
                    }]}
                >
                <Input placeholder='Escreva a ocupação do paciente' />
              </Form.Item>
            </Col>
          </Row>
    <Divider>Endereço</Divider>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                name="zip"
                label="CEP"
                rules={[{
                    required: true,
                    message: "Por favor digite o CEP do paciente"
                }]}
                >
                <Input placeholder='Escreva o cep do paciente' />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                name="state"
                label="Estado"
                rules={[{
                    required: true,
                    message: "Por favor selecione o estado do paciente"
                }]}
                >
                <Select placeholder="Selecione o estado" onChange={handleChangeEstado}>
                    {estados.map((estado) => (
                    <Option key={estado.sigla} value={estado.sigla}>{estado.nome}</Option>
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
                rules={[{
                    required: true,
                    message: "Por favor selecione a cidade do paciente"
                }]}
                >
                <Select placeholder="Selecione a cidade" disabled={!estadoSelecionado}>
                    {cidades.map((cidade) => (
                    <Option key={cidade.id} value={cidade.nome}>{cidade.nome}</Option>
                    ))}
                </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                name="district"
                label="Bairro"
                rules={[{
                    required: true,
                    message: "Por favor digite o bairro do paciente"
                }]}
                >
                <Input placeholder='Escreva o bairro do paciente' />
                </Form.Item>
            </Col>
            </Row>

            <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                name="street"
                label="Rua"
                rules={[{
                    required: true,
                    message: "Por favor digite a rua do paciente"
                }]}

                >
                <Input placeholder='Escreva o endereço do paciente' />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="country" label="País" initialValue="Brasil">
                <Input disabled={true} />
                </Form.Item>
            </Col>
            </Row>
        
        <Form.Item>
            <Button key="submit" htmlType="submit" type="primary" className='button'>
                Cadastrar
          </Button>
          </Form.Item>
        </>
      )}
    </Form>
  </div>
  </SiderComponent>
  );
}

export default PatientRegistration;
