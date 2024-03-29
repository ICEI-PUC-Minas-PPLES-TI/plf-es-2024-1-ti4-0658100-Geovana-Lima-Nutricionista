import React from 'react';
import { Menu } from 'antd';
import { 
    HomeOutlined, 
    CalendarOutlined, 
    TeamOutlined, 
    UserOutlined,
} from '@ant-design/icons';
import theme from '../styles/theme';


export const MenuList = () => {
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
          <Menu.Item key={"add-new-patient"}>Adicionar Novo Paciente</Menu.Item>
        </Menu.SubMenu> 
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Perfil
        </Menu.Item> 
          
      </Menu>
    );
  };
