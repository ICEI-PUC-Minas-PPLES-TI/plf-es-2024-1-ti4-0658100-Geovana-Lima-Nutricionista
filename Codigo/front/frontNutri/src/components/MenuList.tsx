import { Menu } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const MenuList = () => {
  const navigate = useNavigate();
  return (
    <Menu className="menu-bar">
      <Menu.Item
        key={"/home"}
        onClick={({ key }) => {
          navigate(key);
        }}
        icon={<HomeOutlined />}
      >
        Home
      </Menu.Item>
      <Menu.SubMenu
        key="calendar"
        icon={<CalendarOutlined />}
        title="Calendário"
      >
        <Menu.Item
          key={"/appointments"}
          onClick={({ key }) => {
            navigate(key);
          }}
        >
          Ver agenda
        </Menu.Item>
        <Menu.Item
          key={"/appointments/create"}
          onClick={({ key }) => {
            navigate(key);
          }}
        >
          Agendar consulta
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="patients" icon={<TeamOutlined />} title="Pacientes">
        <Menu.Item
          key={"/patients"}
          onClick={({ key }) => {
            navigate(key);
          }}
        >
          Ver pacientes
        </Menu.Item>
        <Menu.Item
          key={"/patients/create"}
          onClick={({ key }) => {
            navigate(key);
          }}
        >
          Adicionar novo paciente
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key={"/user"}
        onClick={({ key }) => {
          navigate(key);
        }}
        icon={<UserOutlined />}
      >
        Perfil
      </Menu.Item>
    </Menu>
  );
};
