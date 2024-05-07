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

const r =  {
  id: 0,
  weight: 0,
  height: 0,
  physicalActivities: '',
  imc: 0,
  waist: 0,
  bust: 0,
  observations: '',
}

export const Patientspage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patientRecord, setPatientRecord] = useState<RecordProps>(r);

  function updateRecord(Record: any) {
    updatePatientRecord(patientRecord.id, Record).then(
      (success: any) => {
        setPatientRecord(success);
      }
    );
  }

  function createRecord(Record: any) {
    Record.patientId = id;
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
      }

      try {
        const response = await getPatientRecordPatient(Number(id));
        setPatientRecord(response);
      } catch (error: any) {
        console.error("Erro ao obter o registro do paciente:", error.message);
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
                  <Text>Ocupação</Text>
                  <Text strong>{patient?.occupation}</Text>
                  <Text>Data de Nascimento</Text>
                  <Text strong>
                    {new Date(patient?.birthDate ?? "").toLocaleDateString(
                      "pt-BR"
                    )}
                  </Text>
                  <Text>Cidade</Text>
                  <Text strong>{patient?.address?.city ?? "" }</Text>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text>Objetivo</Text>
                  <Text strong>{patient?.goal}</Text>
                  <Text>Estado</Text>
                  <Text strong>{patient?.address.state}</Text>
                  <Text>Endereço</Text>
                  <Text strong>{patient?.address.street}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          {patientRecord && (
            <CardPatient
              record={patientRecord}
              onUpdate={updateRecord}
              onCreate={createRecord}
            />
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
