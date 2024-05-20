/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    Col,
    Divider,
    Row,
    Space,
    Typography,
    Button,
    Statistic,
  } from "antd";
  import SiderComponent from "../components/SiderComponent";
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
  import { CalendarOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";
  
  const { Title, Text } = Typography;
  
  const data = [
    { name: 'Produto A', visitas: 80 },
    { name: 'Produto B', visitas: 70 },
    { name: 'Produto C', visitas: 90 },
    { name: 'Produto D', visitas: 20 },
  ];
  
  export const HomePage = () => {
    return (
      <SiderComponent>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Consultas Totais"
                value={100}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Pacientes Totais"
                value={100}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Total Arrecadado"
                value={10000}
                prefix={<DollarOutlined />}
                suffix="R$"
              />
            </Card>
          </Col>
        </Row>
  
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Button type="primary" style={{ float: "right", marginBottom: 16 }}>
              Agendar Consulta
            </Button>
            <Card bordered={false}>
              <Title level={3}>Visitas Pacientes</Title>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitas" fill="#8884d8" />
              </BarChart>
            </Card>
          </Col>
        </Row>
  
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card bordered={false}>
              <Title level={3}>Eventos do Mês</Title>
              <Space direction="vertical" size="large">
                <EventItem date="2024-05-20" description="Meet with Ellen Cho" />
                <EventItem date="2024-05-21" description="1-1 with Scott" />
                <EventItem date="2024-05-22" description="Figma Webinar" />
              </Space>
            </Card>
          </Col>
        </Row>
      </SiderComponent>
    );
  };
  
  const EventItem = ({ date, description }: any) => (
    <Row>
      <Col span={4}>
        <Text strong>{new Date(date).toLocaleDateString("pt-BR")}</Text>
      </Col>
      <Col span={20}>
        <Text>{description}</Text>
      </Col>
    </Row>
  );
  
  export default HomePage;
  