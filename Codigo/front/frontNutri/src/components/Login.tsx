import '../index.css'
import { LockOutlined, UserOutlined, QuestionCircleOutlined  } from '@ant-design/icons';
import { Button, Form, Input, notification, Tooltip } from 'antd';
import iconeNutri from '../assets/nutricionista-maria-fernanda_heroshot-receitas_01.png';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router';
import { Header } from 'antd/es/layout/layout';


const Login = () => {
    document.title = "Login";
    const navigate = useNavigate();

    const onFinish = async (values: {username: string; password: string}) => {
        const userData = {
            email: values.username,
            password: values.password,
        }

        const {data, error} = await login(userData);

        if (data) {
            notification.success({
                message: "Login efetuado com sucesso!",
            })
            navigate("/home");
        }

        if (error) {
            notification.error({
                message: "Usuário ou senha inválidos!",
            });
        }
    };
    return (
        <div className="login-Container">

            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor:'#ddafeb7a', borderRadius:70, margin:15, padding: '0 20px'}}>
            <Tooltip className='tooltip' title="Digite o seu usuário e senha para logar no sistema.
                Caso tenha esquecido a senha, clique no botão 'Esqueci a senha'.">
                <QuestionCircleOutlined style={{ fontSize: '25px', color: 'black' }} />
                </Tooltip>
            <h1 className='titleLogin'>Geovana Lima Nutricionista</h1>
            </Header>
            <div className='imagemecard'>
            <div className='imagem'>
                <img className='image-login' src={iconeNutri}></img>
                </div>
                
                <div className="login-card">
                    <h2>Login</h2>
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
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Usuário" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Senha"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="button">
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">
                                Esqueci a senha
                            </a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );


}
export default Login;


