import SiderComponent from "../components/SiderComponent";
import { CalendarComponent } from '../components/CalendarComponent';
import { Col, Row, Typography, Avatar, List, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Appointment } from "../interfaces/appointment";
import { Patient } from "../interfaces/patient";
import '../index.css';
import { useState } from "react";

export const CalendarPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const proximasConsultas = [
    { paciente: "Maria Eduarda", data: "20 de maio", hora: "16:00" },
    { paciente: "João da Silva", data: "22 de maio", hora: "10:30" },
    { paciente: "Ana Souza", data: "25 de maio", hora: "14:00" }
  ]

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'concluida':
        return 'green';
      case 'cancelada':
        return 'red';
      case 'adiada':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <div>
      <SiderComponent>
        <Typography.Title className="title">Consultas</Typography.Title>
        <Row>
          <Col flex="1 1 200px">
            <CalendarComponent />
          </Col>
          <Col flex="0 1 300px">
            <div style={{ padding: "15px" }}>
              <Typography.Title level={3} className="title">Próximas Consultas</Typography.Title>
              <List
                itemLayout="horizontal"
                dataSource={proximasConsultas}
                renderItem={(proximasConsultas, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                      title={<a href="https://ant.design">{proximasConsultas.paciente}</a>}
                      description={`${proximasConsultas.data} às ${proximasConsultas.hora}`}
                    />
                  </List.Item>
                )}
              />
              <div style={{ marginTop: '120px' }}>
                <Typography.Title level={3} className="title">Estatísticas</Typography.Title>
                <Statistic title="Consultas Concluídas" value={appointments.filter(a => a.status === 'concluida').length} />
                <Statistic title="Consultas Canceladas" value={appointments.filter(a => a.status === 'cancelada').length} />
                <Statistic title="Consultas Adiadas" value={appointments.filter(a => a.status === 'adiada').length} />
              </div>
            </div>
          </Col>
        </Row>
      </SiderComponent>
    </div>
  );
};
