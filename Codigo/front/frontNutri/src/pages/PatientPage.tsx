/* eslint-disable @typescript-eslint/no-explicit-any */
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
import SiderComponent from "../components/SiderComponent";
import Meta from "antd/es/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import { PatientTable } from "../components/PatientTable";
import { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router";
import { Patient } from "../interfaces/patient";
import { getPatient } from "../services/patient.service";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Text } = Typography;

export const Patientspage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);


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
                title={patient?.name}
                description={
                  <Flex gap="middle" vertical>
                    <p>{patient?.email}</p>
                    <Text strong>
                      Consultas: {patient?.totalAppointments ?? 0}
                    </Text>
                    <Text strong>
                      Total Pago: R${patient?.totalPrice ?? 0.0}
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
                  <Text strong>Ocupação:</Text>
                  <Text>{patient?.occupation}</Text>
                  <Text strong>Data de Nascimento:</Text>
                  <Text>
                    {new Date(patient?.birthDate ?? "").toLocaleDateString(
                      "pt-BR"
                    )}
                  </Text>
                  <Text strong>Objetivo:</Text>
                  <Text>{patient?.goal}</Text>
                </Space>
              </Col>

              <Col style={{border: "1 solid black"}} span={12}>
                <Space direction="vertical" size="middle">
                  <Text strong>Endereço:</Text>
                  <Text>{patient?.address.street}</Text>
                  <Text strong>Cidade/Estado:</Text>
                  <Text>{patient?.address?.city ?? ""} / {patient?.address.state}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          {patient?.records && (
            <LineChart width={400} height={300} data={patient?.records}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              <Line type="monotone" dataKey="imc" stroke="#82ca9d" />
            </LineChart>
          )}
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={2}>Consultas</Title>
          </Divider>
          <PatientTable patientId={Number(id)} />
        </Col>
      </Row>
    </SiderComponent>
  );
};
