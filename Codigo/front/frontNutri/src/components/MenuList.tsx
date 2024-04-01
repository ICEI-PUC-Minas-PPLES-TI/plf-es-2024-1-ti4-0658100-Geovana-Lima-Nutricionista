import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { 
    HomeOutlined, 
    CalendarOutlined, 
    TeamOutlined, 
    UserOutlined,
} from '@ant-design/icons';
import theme from '../styles/theme';
import PatientRegistration  from './PatientRegistration';
import { useNavigate } from 'react-router-dom';



export const MenuList = () => {
 
  
  const navigate = useNavigate();
    return (
      <Menu className="menu-bar" style={{ backgroundColor: theme.primaryColor }}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.SubMenu 
          key="calendar" 
          icon={<CalendarOutlined />}
          title="Calendário"
        >
          <Menu.Item key={"check-schedule"}>Ver Agenda</Menu.Item>
          <Menu.Item key={"add-new-event"}>Adicionar Novo Evento</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu 
          key="patients" 
          icon={<TeamOutlined />}
          title="Pacientes"
        >
          <Menu.Item key={"check-patient"}>Ver Pacientes</Menu.Item>
          <Menu.Item 
           key={"/add-new-patient"}
           onClick={({ key }) => {
            navigate(key);
           }}
           >Adicionar Novo Paciente
             </Menu.Item>
        </Menu.SubMenu> 
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Perfil
        </Menu.Item> 
          
      </Menu>
    );
  };
