import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col, Divider } from 'antd';
import theme from '../styles/theme';
import Title from 'antd/es/typography/Title';
import { Route, Routes } from 'react-router-dom';

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

const PatientRegistration = () => {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form autoComplete='off' labelWrap {...formItemLayout} style={{ maxWidth: 600 }}>
        <Title style={{ textAlign: 'center' }}>Cadastro do Paciente</Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Por favor escreva o nome do paciente" }]}>
              <Input placeholder='Escreva o nome do paciente' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="E-mail" rules={[{ required: true, type: 'email', message: "Por favor digite um e-mail válido" }]}>
              <Input placeholder='Escreva o e-mail do paciente' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item 
            name="birthDate" 
            label="Data de Nascimento" 
            rules={[{ required: true, message: "Por favor digite a data de nascimento do paciente" }]}>
              <DatePicker  style={{ width: "100% " }} picker='date' placeholder='Escreva a data de nascimento do paciente' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="occupation" label="Ocupação" rules={[{ required: true, message: "Por favor digite a ocupação do paciente" }]}>
              <Input placeholder='Escreva a ocupação do paciente' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="goal" label="Objetivo" rules={[{ required: true, message: "Por favor digite o objetivo do paciente" }]}>
          <Input placeholder='Escreva o objetivo do paciente' />
        </Form.Item>

        <Divider>Endereço</Divider>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="zip" label="CEP" rules={[{ required: true, message: "Por favor digite o CEP do paciente" }]}>
              <Input placeholder='Escreva o cep do paciente' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="state" label="Estado" rules={[{ required: true, message: "Por favor selecione o estado do paciente" }]}>
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
            <Form.Item name="city" label="Cidade" rules={[{ required: true, message: "Por favor selecione a cidade do paciente" }]}>
              <Select placeholder="Selecione a cidade" disabled={!estadoSelecionado}>
                {cidades.map((cidade) => (
                  <Option key={cidade.id} value={cidade.nome}>{cidade.nome}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="district" label="Bairro" rules={[{ required: true, message: "Por favor digite o bairro do paciente" }]}>
              <Input placeholder='Escreva o bairro do paciente' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="street" label="Rua" rules={[{ required: true, message: "Por favor digite a rua do paciente" }]}>
              <Input placeholder='Escreva o endereço do paciente' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="country" label="País" initialValue="Brasil">
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ sm: { span: 32, offset: 8 } }}>
            <Row justify="center">
                <Col>
                <Button type='primary' htmlType='submit' style={{ backgroundColor: theme.primaryColor }}>Cadastrar</Button>
                </Col>
            </Row>
            </Form.Item>
      </Form>
    </div>
  );
}

export default PatientRegistration;
