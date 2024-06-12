import SiderComponent from "../components/SiderComponent";
import { CalendarComponent } from "../components/CalendarComponent";
import { Col, Row, Typography, Avatar, List, Statistic } from "antd";
import { useEffect, useState } from "react";
import { getSchedule, getSumaryData } from "../services/appointment.service";
import { Appointment } from "../interfaces/appointment";

export const CalendarPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await getSchedule();
        setAppointments(data);
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
        </Row>
      </SiderComponent>
    </div>
  );
};
