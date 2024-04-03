import '../index.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import iconeNutri from '../assets/nutricionista-maria-fernanda_heroshot-receitas_01.png';

const Login = () => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className="login-Container">

            <div className="title-container">
                <span className="title-text">GL</span>
                <span className="title-text">Geovana Lima Nutricionista</span>
                <span className="help-icon">?</span>
            </div>

            <div className="login-Container-down">

                <img src={iconeNutri}></img>

                <div className="login-card">
                    <h2>Tela de Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );


}
export default Login;


