import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Select,
  Tooltip,
  notification,
} from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import SiderComponent from "../components/SiderComponent";
import money from "../assets/money.svg";
import patients from "../assets/patients.svg";
import doctor from "../assets/doctor.svg";
import virtualMeeting from "../assets/virtual-meeting.svg";
import meeting from "../assets/meeting.svg";
import pin from "../assets/pin.svg";
import "../styles/HomePage.css";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import {
  getPatientvisits,
  getPatientvisitsMensais,
  getSchedule,
  getSumaryData,
} from "../services/appointment.service";
import { useNavigate } from "react-router";
import styled from "styled-components";

const { Title } = Typography;
const { Option } = Select;

const PurpleSelect = styled(Select)`
  padding: 20px;
  border: none;
  background: #cb6ce6;
  color: white;
  border-radius: 20px;
  box-shadow: 0px 6px 10px 0px #00000024;
`;

export const HomePage = () => {
  const [apointmentData, setapointmentData] = useState(Array);
  const [sumary, setSumary] = useState([
    { appointments: 0, totalPatients: 0, totalRevenue: 0.0 },
  ]);
  const [selectedYear, setSelectedYear] = useState("2024");
  let selectedSem = "1";
  const [capointmentData, setcapointmentData] = useState(Array);
  const [appointments, setappointments] = useState(Array);

  useEffect(() => {
    const getAgenda = async () => {
      const { data, error } = await getSchedule();

      if (data) {
        setappointments(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao carregar paciente!",
        });
      }
    };

    const getPatientvisit = async () => {
      const { data, error } = await getPatientvisitsMensais(
        parseInt(selectedYear)
      );

      if (data) {
        setapointmentData(divideDataIntoSemesters(data));
        setcapointmentData(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao carregar paciente!",
        });
      }
    };
    const getSumaryDatas = async () => {
      const { data, error } = await getSumaryData();

      if (data) {
        setSumary(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao carregar paciente!",
        });
      }
    };
    getAgenda();
    getSumaryDatas();
    getPatientvisit();
  }, []);

  const schedule = appointments.map((appointment) => ({
    date: new Date(appointment.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    agenda: [
      {
        type: "virtualMeeting",
        description: `Consulta com ${appointment.patient.name}`,
        local: `${appointment.date} ${appointment.hour}`,
      },
    ],
  }));
  const navigate = useNavigate();

  interface MonthData {
    [key: string]: number;
  }
  interface FormattedData {
    mes: string;
    visitas: number;
  }
  const getPatientvisit = async (value: string) => {
    const { data, error } = await getPatientvisitsMensais(parseInt(value));

    if (data) {
      setapointmentData(divideDataIntoSemesters(data));
      setcapointmentData(data);
    }

    if (error) {
      notification.error({
        message: "Erro ao carregar paciente!",
      });
    }
  };

  const changeSem = async (value: string) => {
    selectedSem = value;
    setapointmentData(divideDataIntoSemesters(capointmentData));
  };

  const divideDataIntoSemesters = (data: MonthData) => {
    const firstSemesterMonths = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
    ];
    const secondSemesterMonths = [
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const firstSemester: FormattedData[] = firstSemesterMonths.map((mes) => ({
      mes: mes.substring(0, 3),
      visitas: data[mes] || 0,
    }));

    const secondSemester: FormattedData[] = secondSemesterMonths.map((mes) => ({
      mes: mes.substring(0, 3),
      visitas: data[mes] || 0,
    }));
    if (selectedSem == "1") {
      return firstSemester;
    }
    return secondSemester;
  };

  return (
    <SiderComponent>
      <div className="home-page">
        <div className="page-title">
          <Title className="title">Página Inicial</Title>
        </div>

        <Row className="row principal-cards" gutter={16}>
          <Col span={6}>
            <Card bordered={false} className="stat-card">
              <div className="start-card">
                <img src={doctor}></img>
                <div>
                  <p>Consultas Totais:</p>
                  <p>{sumary.appointments}</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className="stat-card">
              <div className="start-card">
                <img src={patients}></img>
                <div>
                  <p>Pacientes Totais:</p>
                  <p>{sumary.totalPatients}</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className="stat-card">
              <div className="start-card">
                <img src={money}></img>
                <div>
                  <p>Total Arrencado:</p>
                  <p>{sumary.totalRevenue}</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Button
              onClick={() => {
                navigate("/appointments/create");
              }}
              type="primary"
              className="schedule-button"
            >
              Agendar Consulta
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={16}>
            <div className="header-actions">
              <PurpleSelect
                defaultValue="2024"
                onChange={(value) => getPatientvisit(value)}
                className="select-filter"
              >
                <Option value="2023">2023</Option>
                <Option value="2024">2024</Option>
                <Option value="2025">2025</Option>
              </PurpleSelect>
            </div>
            <Card bordered={false} className="chart-card">
              <div className="patient-visit">
                <Title level={3}>Visitas Pacientes Mensais</Title>
                <PurpleSelect
                  defaultValue="1"
                  onChange={(value) => changeSem(value)}
                  className="select-filter"
                >
                  <Option value="1">1 semestre</Option>
                  <Option value="2">2 semestre</Option>
                </PurpleSelect>
              </div>
              <BarChart
                width={600}
                height={300}
                data={apointmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitas" fill="#A642F4" />
              </BarChart>
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false} className="events-card">
              <Title level={3}>Eventos do Mês</Title>
              <GenerateSchedule schedule={schedule} />
            </Card>
          </Col>
        </Row>
      </div>
    </SiderComponent>
  );
};

const GenerateSchedule = ({ schedule }: any) =>
  schedule.map((item: any) => {
    return (
      <div>
        <small className="date">{item.date}</small>
        <GenerateAgenda agenda={item.agenda} />
      </div>
    );
  });

const GenerateAgenda = ({ agenda }: any) =>
  agenda.map((item: any) => {
    return (
      <div className="agenda">
        <div className="agenda-picture">
          <img
            src={
              item.type === "virtualMeeting"
                ? virtualMeeting
                : item.type === "meeting"
                ? meeting
                : pin
            }
          ></img>
        </div>
        <div>
          <p>{item.description}</p>
          <small>{item.local}</small>
        </div>
      </div>
    );
  });

const EventItem = ({ date, description }: any) => (
  <Row>
    <Col span={6}>
      <Typography.Text strong>
        {new Date(date).toLocaleDateString("pt-BR")}
      </Typography.Text>
    </Col>
    <Col span={18}>
      <Typography.Text>{description}</Typography.Text>
    </Col>
  </Row>
);

export default HomePage;
