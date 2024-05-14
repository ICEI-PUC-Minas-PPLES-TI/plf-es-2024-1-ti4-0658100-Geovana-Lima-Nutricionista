import { Calendar, ConfigProvider } from "antd";
import SiderComponent from "../components/SiderComponent";
import { Appointment } from "../interfaces/appointment";
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointment.service";

export const CalendarPage = () => {
  const [events, setEvents] = useState<Record<string, Appointment[]>>({}); // Objeto onde as chaves são as datas e os valores são arrays de eventos

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await getAppointments();
      if (data) {
        const eventsByDate: Record<string, Appointment[]> = {};
        data.forEach((appointment) => {
          const dateKey = appointment.date;
          if (eventsByDate[dateKey]) {
            eventsByDate[dateKey].push(appointment);
          } else {
            eventsByDate[dateKey] = [appointment];
          }
        });
        setEvents(eventsByDate);
      }
      if (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <SiderComponent>
      <div>
        <ConfigProvider theme={{
          token: {
            colorPrimary: "cb6cec"
          }
        }}>
          <Calendar
            cellRender={(date) => {
              const formattedDate = date.format("YYYY-MM-DD");
              const appointmentsForDate = events[formattedDate] || [];
              return (
                <ul>
                  {appointmentsForDate.map((appointment, index) => (
                    <li key={index}>{appointment.hour}</li>
                  ))}
                </ul>
              );
            }}
          />
        </ConfigProvider>
      </div>
    </SiderComponent>
  );
};
