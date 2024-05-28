import { ReactNode, useState } from "react";
import { Layout, Button, Badge, Drawer } from "antd";
import { Logo } from "./Logo";
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import "../index.css";
import { MenuList } from "./MenuList";
import { Patient } from "../interfaces/patient";
import styled from "styled-components";
import { getPatient } from "../services/patient.service";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const mockConsultations = [
  {
    title: "Consulta de Rotina",
    description: "Verificação de saúde geral e atualização de vacinas.",
    patient:  "Paciente: João",
  },
  {
    title: "Consulta de Cardiologia",
    description: "Avaliação de pressão arterial e exame de ecocardiograma.",
    patient: "Paciente: Marcos"
  },
  {
    title: "Consulta de Pediatria",
    description: "Acompanhamento do desenvolvimento infantil e orientações nutricionais.",
    patient: "Paciente: Maria" ,
  },
  {
    title: "Consulta de Dermatologia",
    description: "Exame de manchas na pele e tratamento de acne.",
    patient: "Paciente: João",
  },
  {
    title: "Consulta de Ortopedia",
    description: "Avaliação de dores no joelho e exame de raio-X.",
    patient: "Paciente: Ana",
  }
];


const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  max-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: calc(100vh - 48px);
  overflow-y: auto;

  @media (max-width: 992px) {
    margin-top: 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface SiderComponentProps {
  children: ReactNode;
}

function SiderComponent({ children }: SiderComponentProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  return (
    <StyledLayout>
      <Sider
        className="sideBar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <Logo />
        </div>
        <MenuList />
      </Sider>
      <Layout>
        <Header className="header">
          <HeaderContent>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              style={{ marginLeft: '16px' }}
            />
            <div>
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{ fontSize: '16px', marginRight: '16px', backgroundColor: '#cb6cec', borderRadius: '30px', boxShadow: '0 2px 4px' }}
              />
              <Button
                type="text"
                icon={<Badge count={5}><BellOutlined /></Badge>}
                style={{ fontSize: '16px', backgroundColor: '#cb6cec', borderRadius: '30px', boxShadow: '0 2px 4px' }}
                onClick={toggleNotifications}
              />
            </div>
          </HeaderContent>
        </Header>
        <StyledContent>{children}</StyledContent>
      </Layout>
      <Drawer
        title="Notificações"
        placement="right"
        closable={true}
        onClose={toggleNotifications}
        open={notificationsVisible}
      >
        {mockConsultations.map((consultation, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <h3>{consultation.title}</h3>
            <p>{consultation.description}</p>
            <p>
              <strong>
                <Link to={`/paciente/patient.id`}>{consultation.patient}</Link>
              </strong>
            </p>
          </div>
        ))}
      </Drawer>
    </StyledLayout>
  );
}

export default SiderComponent;
