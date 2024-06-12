import React, { useState } from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import SiderComponent from '../components/SiderComponent';
import { useNavigate } from 'react-router';
import '../index.css';

export const UserPage = () => {
  document.title = "Página do usuário";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const onFinish = (values: { email: any; password: any; confirmPassword: any; }) => {
    const { email, password, confirmPassword } = values;
    if (password === confirmPassword) {
      console.log('Email:', email);
      console.log('Senha:', password);
      notification.success({
        message: 'Atualização bem-sucedida',
        description: 'Suas informações foram atualizadas com sucesso!',
      });
    } else {
      notification.error({
        message: 'Erro de validação',
        description: 'As senhas não coincidem.',
      });
    }
  };

  return (
    <SiderComponent>
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '1em' }}>
      <Typography.Title className="title" level={2}>Atualizar Informações</Typography.Title>
      <Form
        form={form}
        name="userForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Novo E-mail"
          name="email"
          rules={[{type: 'email', message: 'Por favor, insira um e-mail válido!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Nova Senha"
          name="password"
          rules={[{  message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item
          label="Confirme a Nova Senha"
          name="confirmPassword"
          rules={[{ message: 'Por favor, confirme sua senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" className='button'>
            Atualizar
          </Button>
        </Form.Item>
      </Form>
    </div>
    </SiderComponent>
  );
};
