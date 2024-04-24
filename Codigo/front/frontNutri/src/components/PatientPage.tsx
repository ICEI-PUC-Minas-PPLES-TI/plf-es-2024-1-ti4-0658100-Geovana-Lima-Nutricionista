import {
  Card,
  Col,
  Divider,
  Flex,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import SiderComponent from "./SiderComponent";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import { PatientTable } from "./PatientTable";
import { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router";
import { Patient } from "../interfaces/patient";
import { getPatient } from "../services/patient.service";
import CardPatient from "./PatientRecordCard";
import {
  createPatientRecord,
  getPatientRecordPatient,
  updatePatientRecord,
} from "../services/record.service";
import { RecordProps } from "../interfaces/Record";

const { Text } = Typography;

const r = {
  id: 0,
  weight: "",
  height: "",
  physicalActivities: "",
  imc: "",
  waist: "",
  bust: "",
  observations: "",
};
const p = {
  id: 1,
  name: "",
  email: "",
  birthDate: "",
  occupation: "",
  goal: "",
  address: {
    zip: "",
    state: "",
    city: "",
    district: "",
    street: "",
    country: "",
  },
};

export const Patientspage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState<Patient>(p);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const a = JSON.parse(localStorage.getItem("patient") ?? JSON.stringify(p));

  const [patientRecord, setPatientRecord] = useState<RecordProps>(r);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient(a.id);
        setPatient(response.data);
      } catch (error: any) {
        console.error("Erro ao obter o registro do paciente:", error.message);
      }

      try {
        const response = await getPatientRecordPatient(a.id);
        setPatientRecord(response);
      } catch (error: any) {
        console.error("Erro ao obter o registro do paciente:", error.message);
      }
    };

    fetchData();
  }, []);

  function updateRecord(Record: any) {
    console.log(patient);
    updatePatientRecord(patientRecord.id, Record).then((success: any) => {
      setPatientRecord(success);
    });
  }

  function createRecord(Record: any) {
    Record.patientId = a.id;
    console.log(Record);
    createPatientRecord(Record).then((success: any) => {
      setPatientRecord(success);
    });
  }

  useEffect(() => {
    const loadPatient = async () => {
      const { data, error } = await getPatient(Number(id));

      if (data) {
        setPatient(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao carregar paciente!",
        });

        setPatient(p);
      }
    };

    loadPatient();
  }, [id]);

  return (
    <SiderComponent>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <UserOutlined style={{ fontSize: 64 }} />
              </div>
              <Meta
                title={patient.name}
                description={
                  <Flex gap="middle" vertical>
                    <p>{patient.email}</p>
                    <Text strong>
                      Consultas: {patient.totalAppointments ?? 0}
                    </Text>
                    <Text strong>
                      Total Pago: R${patient.totalPrice ?? 0.0}
                    </Text>
                  </Flex>
                }
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text>Ocupação</Text>
                  <Text strong>{patient.occupation}</Text>
                  <Text>Data de Nascimento</Text>
                  <Text strong>
                    {new Date(patient.birthDate).toLocaleDateString("pt-BR")}
                  </Text>
                  <Text>Cidade</Text>
                  <Text strong>{patient.address.city}</Text>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text>Objetivo</Text>
                  <Text strong>{patient.goal}</Text>
                  <Text>Estado</Text>
                  <Text strong>{patient.address.state}</Text>
                  <Text>Endereço</Text>
                  <Text strong>{patient.address.street}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <CardPatient
            record={patientRecord}
            onUpdate={updateRecord}
            onCreate={createRecord}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={2}>Consultas</Title>
          </Divider>
          <PatientTable />
        </Col>
      </Row>
    </SiderComponent>
  );
};
