import SiderComponent from "../components/SiderComponent";
import { CalendarComponent } from "../components/CalendarComponent";
import { Col, Row, Typography, Avatar, List, Statistic } from "antd";
import { useEffect, useState } from "react";
import { getSchedule, getSumaryData } from "../services/appointment.service";
import { Appointment } from "../interfaces/appointment";

export const CalendarPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [proximasConsultas, setProximasConsultas] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await getSchedule();
        setAppointments(data);
        setProximasConsultas(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <SiderComponent>
        <Typography.Title className="title">Consultas</Typography.Title>
        <Row>
          <Col flex="1 1 200px">
            <CalendarComponent />
          </Col>
          {/* Lateral */}
          <Col flex="0 1 300px">
            <div style={{ padding: "15px" }}>
              <Typography.Title level={3} className="title">
                Próximas Consultas
              </Typography.Title>
              <List
                itemLayout="horizontal"
                dataSource={proximasConsultas}
                renderItem={(consulta, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={
                        <a href="https://ant.design">
                          {consulta.patient?.name}
                        </a>
                      }
                      description={`${new Date(
                        consulta.date
                      ).toLocaleDateString("pt-BR")} às ${consulta.hour}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </SiderComponent>
    </div>
  );
};
