import React from "react";
import { Card, Col, Row, Typography, Button, Statistic, Select, Space, Tooltip } from "antd";
import { CalendarOutlined, UserOutlined, DollarOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import SiderComponent from "../components/SiderComponent";
import "../styles/HomePage.css";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

const { Title } = Typography;
const { Option } = Select;

const data = [
  { name: "Produto A", visitas: 80 },
  { name: "Produto B", visitas: 70 },
  { name: "Produto C", visitas: 90 },
  { name: "Produto D", visitas: 20 },
];

export const HomePage = () => {
  return (
    <SiderComponent>
      <div className="home-page">
        <Title className="page-title">Página Inicial</Title>

        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} className="stat-card">
              <Statistic
                title="Consultas Totais"
                value={100}
                prefix={<CalendarOutlined className="stat-icon" />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="stat-card">
              <Statistic
                title="Pacientes Totais"
                value={100}
                prefix={<UserOutlined className="stat-icon" />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="stat-card">
              <Statistic
                title="Total Arrecadado"
                value={10000}
                prefix={<DollarOutlined className="stat-icon" />}
                suffix="R$"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={16}>
            <div className="header-actions">
              <Select defaultValue="Visitas X Mês" className="select-filter">
                <Option value="visitas">Visitas X Mês</Option>
                <Option value="consultas">Consultas X Mês</Option>
              </Select>
              <Select defaultValue="Este Ano" className="select-filter">
                <Option value="2024">2024</Option>
                <Option value="2023">2023</Option>
              </Select>
              <Button type="primary" className="schedule-button">
                Agendar Consulta
              </Button>
              <Button className="icon-button">
                <SearchOutlined />
              </Button>
              <Button className="icon-button">
                <BellOutlined />
              </Button>
            </div>
            <Card bordered={false} className="chart-card">
              <Title level={3}>Visitas Pacientes</Title>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
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

          <Col span={8}>
            <Card bordered={false} className="events-card">
              <Title level={3}>Eventos do Mês</Title>
              <Space direction="vertical" size="large">
                <EventItem date="2024-05-20" description="Meet with Ellen Cho" />
                <EventItem date="2024-05-21" description="1-1 with Scott" />
                <EventItem date="2024-05-22" description="Figma Webinar" />
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </SiderComponent>
  );
};

const EventItem = ({ date, description }:any) => (
  <Row>
    <Col span={6}>
      <Typography.Text strong>{new Date(date).toLocaleDateString("pt-BR")}</Typography.Text>
    </Col>
    <Col span={18}>
      <Typography.Text>{description}</Typography.Text>
    </Col>
  </Row>
);

export default HomePage;
