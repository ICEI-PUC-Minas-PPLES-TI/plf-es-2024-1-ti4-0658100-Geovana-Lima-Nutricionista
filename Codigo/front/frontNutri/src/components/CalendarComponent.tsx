import { Calendar, Button, Radio, ConfigProvider, Typography } from 'antd';
import moment, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';
import { Appointment } from "../interfaces/appointment";
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointment.service";
import '../index.css';
import { useNavigate } from 'react-router-dom';

export const CalendarComponent = () => {
  const [events, setEvents] = useState<Record<string, Appointment[]>>({}); // Objeto onde as chaves são as datas e os valores são arrays de eventos
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(moment());
  const [view, setView] = useState<'month' | 'year'>('month');
  const [calendarTitle, setCalendarTitle] = useState<string>(moment().locale('pt-br').format('MMMM [de] YYYY'));
  const navigate = useNavigate();

  const handleViewChange = (e: any) => {
    setView(e.target.value);
    if (e.target.value === 'month') {
      setCalendarTitle(selectedDate.locale('pt-br').format('MMMM [de] YYYY'));
    } else {
      setCalendarTitle(selectedDate.locale('pt-br').format('YYYY'));
    }
  };
  
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

  const handleAddConsultation = () => {
    navigate('/appointments/create');
  };

  const handleCalendarChange = (value: Dayjs) => {
    setSelectedDate(value);
    if (view === 'month') {
      setCalendarTitle(value.locale('pt-br').format('MMMM [de] YYYY'));
    } else {
      setCalendarTitle(value.locale('pt-br').format('YYYY'));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" className="button" onClick={handleAddConsultation} style={{ marginRight: '10px' }}>
        Adicionar Consulta
      </Button>
      <Radio.Group value={view} onChange={handleViewChange} style={{ marginLeft: '10px' }}>
        <Radio.Button value="month">Mensal</Radio.Button>
        <Radio.Button value="year">Anual</Radio.Button>
      </Radio.Group>
      <div style={{ padding: 10, textAlign: 'center' }}>
        <Typography.Title level={3} className="subtitle">{calendarTitle.charAt(0).toUpperCase() + calendarTitle.slice(1)}</Typography.Title>
      </div>
      <ConfigProvider theme={{ token: { colorPrimary: "cb6cec", borderRadius: 50 } }} locale={locale}>
        <Calendar
          className="rounded-calendar"
          cellRender={(date) => {
            const formattedDate = date.format("DD-MM-YYYY");
            const appointmentsForDate = events[formattedDate] || [];
            return (
              <ul>
                {appointmentsForDate.map((appointment, index) => (
                  <li key={index}>{appointment.hour}</li>
                ))}
              </ul>
            );
          }}
          onSelect={setSelectedDate}
          onPanelChange={handleCalendarChange}
          mode={view as any}
        />
      </ConfigProvider>
    </div>
  );
};
