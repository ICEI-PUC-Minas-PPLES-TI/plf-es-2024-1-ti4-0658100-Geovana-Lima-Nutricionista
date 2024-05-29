import { Calendar, Button, Radio, ConfigProvider, Typography } from "antd";
import moment, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/lib/locale/pt_BR";
import { Appointment } from "../interfaces/appointment";
import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointment.service";
import { ModalAddAppointment } from "./ModalAddAppointment";
import { DailyView } from "./DailyView";
import "../index.css";
import { useNavigate } from "react-router";

export const CalendarComponent = () => {
  const [events, setEvents] = useState<Record<string, Appointment[]>>({});
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(moment());
  const [view, setView] = useState<"month" | "year" | "day">("month");
  const [calendarTitle, setCalendarTitle] = useState<string>(
    moment().locale("pt-br").format("MMMM [de] YYYY")
  );

  const navigate = useNavigate();


  const handleViewChange = (value: "month" | "year" | "day") => {
    setView(value);
    if (value === "month") {
      setCalendarTitle(selectedDate.locale("pt-br").format("MMMM [de] YYYY"));

      return;
    }
    setCalendarTitle(
      selectedDate.locale("pt-br").format("DD [de] MMMM [de] YYYY")
    );
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await getAppointments();
      if (data) {
        const eventsByDate: Record<string, Appointment[]> = {};
        data.forEach((appointment) => {
          const dateKey = moment(appointment.date).format("DD-MM-YYYY");
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

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = (values: Appointment) => {
    const newEvents = { ...events };
    const dateKey = moment(values.date).format("DD-MM-YYYY");
    if (newEvents[dateKey]) {
      newEvents[dateKey].push(values);
    } else {
      newEvents[dateKey] = [values];
    }
    setEvents(newEvents);
    setVisible(false);
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    handleViewChange("day");
  };

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        className="button"
        onClick={handleAddConsultation}
        style={{ marginRight: "10px" }}
      >
        Adicionar Consulta
      </Button>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorPrimary: "#cb6cec",
            },
          },
        }}
      >
        <Radio.Group
          value={view}
          onChange={(e) => handleViewChange(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <Radio.Button style={{ color: "#cb6cec" }} value="month">
            Mensal
          </Radio.Button>
          <Radio.Button style={{ color: "#cb6cec" }} value="day">
            Diária
          </Radio.Button>
        </Radio.Group>
      </ConfigProvider>
      <div style={{ padding: 10, textAlign: "center" }}>
        {view === "month" && (
          <Typography.Title level={3} className="subtitle">
            {calendarTitle.charAt(0).toUpperCase() + calendarTitle.slice(1)}
          </Typography.Title>
        )}
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#cb6cec",
          },
        }}
        locale={locale}
      >
        {view === "day" ? (
          <DailyView
            date={selectedDate.locale("pt-br").format("DD [de] MMMM [de] YYYY")}
            appointments={events[selectedDate.format("DD-MM-YYYY")] || []}
            onBack={() => handleViewChange("month")}
          />
        ) : (
          <Calendar
            className="rounded-calendar"
            headerRender={() => null}
            cellRender={(date) => {
              const formattedDate = date.format("DD-MM-YYYY");
              const appointmentsForDate = events[formattedDate] || [];
              return (
                <ul>
                  {appointmentsForDate.map((appointment, index) => (
                    <li key={index}>
                      {appointment.hour + " - " + appointment.patient?.name}
                    </li>
                  ))}
                </ul>
              );
            }}
            onSelect={handleDateSelect}
            mode={view}
          />
        )}
      </ConfigProvider>
      <ModalAddAppointment
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
    </div>
  );
};
