import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Button, Select, Tooltip, notification } from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import SiderComponent from "../components/SiderComponent";
import money from '../assets/money.svg';
import patients from '../assets/patients.svg';
import doctor from '../assets/doctor.svg';
import virtualMeeting from '../assets/virtual-meeting.svg';
import meeting from '../assets/meeting.svg';
import pin from '../assets/pin.svg';
import "../styles/HomePage.css";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { getPatientvisits, getSumaryData } from "../services/appointment.service";

const { Title } = Typography;
const { Option } = Select;



const schedule: any[] = [
  {
    date: "Oct 24, 2022",
    agenda: [
      {
        type: "virtualMeeting",
        description: "Meet with Ellen Cho",
        local: "Zoom Call"
      },
      {
        type: "meeting",
        description: "Meet with Ellen Cho",
        local: "Zoom Call"
      },
      {
        type: "pin",
        description: "Meet with Ellen Cho",
        local: "Zoom Call"
      }
    ]
  }
];



export const HomePage = () => {
  const [apointmentData, setapointmentData] = useState(Array);
  const [sumary, setSumary] = useState([{"appointments":0,"totalPatients":0,"totalRevenue":0.0}]);

  useEffect(() => {
    const getPatientvisit = async () => {
      const { data, error } = await getPatientvisits();
  
      if (data) {
        setapointmentData(data);
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
    getSumaryDatas();
    getPatientvisit();
  }, []);

  return (

    <SiderComponent>
      <div className="home-page">
        <div className="page-title">
          <Title className="title">Página Inicial</Title>
          <div className="buttons">
            <Button className="icon-button">
              <SearchOutlined />
            </Button>
            <Button className="icon-button">
              <BellOutlined />
            </Button>
          </div>

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
            <Button type="primary" className="schedule-button">
              Agendar Consulta
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={16}>
            <div className="header-actions">
              <Select defaultValue="Visitas X Mês" className="select-filter">
                <Option value="visitas">Visitas X Mês</Option>
                <Option value="consultas">Consultas X Mês</Option>
              </Select>

            </div>
            <Card bordered={false} className="chart-card">
              <div className="patient-visit">
                <Title level={3}>Visitas Pacientes</Title>
                <Select defaultValue="Este Ano" className="select-filter">
                  <Option value="2024">2024</Option>
                  <Option value="2023">2023</Option>
                </Select>
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
                <XAxis dataKey="name" />
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
(schedule.map((item: any) => {
  return <div>
    <small className="date">{item.date}</small>
    <GenerateAgenda agenda = {item.agenda}/>

  </div>
})
)

const GenerateAgenda = ({ agenda }: any) =>
(agenda.map((item: any) => {
  return <div className="agenda">
    <div className="agenda-picture" >
    <img src={item.type === "virtualMeeting" ? virtualMeeting : item.type === "meeting" ? meeting : pin}></img>
    </div>
    <div>
      <p>{item.description}</p>
      <small>{item.local}</small>
    </div>
  </div>
})
)

const EventItem = ({ date, description }: any) => (
  <Row>
    <Col span={6}>
      <Typography.Text strong>{new Date(date).toLocaleDateString("pt-BR")}</Typography.Text>
    </Col>
    <Col span={18}>
      <Typography.Text>{description}</Typography.Text>
    </Col>
  </Row>
);

export default HomePage;
