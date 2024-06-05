import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  notification,
} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import SiderComponent from '../components/SiderComponent';
import Meta from 'antd/es/card/Meta';
import { PatientTable } from '../components/PatientTable';
import { useParams } from 'react-router';
import { Patient } from '../interfaces/patient';
import { getPatient, updatePatient } from '../services/patient.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../index.css';
import EditPatientModal from '../components/EditPatientModal';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export const Patientspage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [patientEditing, setPatientEditing] = useState<Patient | null>(null);

  const openEditModal = (patient: Patient) => {
    if (patient) {
      setPatientEditing(patient);
      setIsEditing(true);
    }
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setPatientEditing(null);
  };

  const saveEdit = async (values: any) => {
    if (patientEditing) {
      const updatedPatient = { ...patientEditing, ...values };
  
      // Log dos dados antes do envio
      console.log('Dados enviados para atualização:', JSON.stringify(updatedPatient, null, 2));
  
      try {
        const { data, error } = await updatePatient(Number(id), updatedPatient);
  
        if (data) {
          setPatient(data);
          notification.success({
            message: 'Paciente atualizado com sucesso!',
          });
        }
  
        if (error) {
          notification.error({
            message: 'Erro ao atualizar paciente!',
          });
        }
  
        closeEditModal();
      } catch (error) {
        notification.error({
          message: 'Erro ao atualizar paciente!',
        });
        console.error('Erro ao atualizar paciente:', error);
      }
    }
  };
  
  useEffect(() => {
    const loadPatient = async () => {
      const { data, error } = await getPatient(Number(id));

      if (data) {
        setPatient(data);
      }

      if (error) {
        notification.error({
          message: 'Erro ao carregar paciente!',
        });
      }
    };

    loadPatient();
  }, [id]);

  return (
    <SiderComponent>
      <Row gutter={16}>
        <Col span={8}>
          {patient && (
            <Card bordered={false} className="itemCard">
              <EditOutlined
                key="edit"
                onClick={() => openEditModal(patient)}
                style={{ position: 'absolute', top: 20, right: 20, zIndex: 1, fontSize: 20 }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <UserOutlined style={{ fontSize: 64 }} />
                </div>
                <Meta
                  title={patient.name}
                  description={
                    <Space direction="vertical">
                      <p>{patient.email}</p>
                      <Text strong>Consultas: {patient.totalAppointments ?? 0}</Text>
                      <Text strong>Total Pago: R${patient.totalPrice ?? 0.0}</Text>
                    </Space>
                  }
                />
              </div>
            </Card>
          )}
        </Col>
        <Col span={8}>
          <Card bordered={false} className="itemCard">
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text strong>Ocupação:</Text>
                  <Text>{patient?.occupation}</Text>
                  <Text strong>Data de Nascimento:</Text>
                  <Text>
                    {new Date(patient?.birthDate ?? "").toLocaleDateString(
                      "pt-BR"
                    )} - {patient?.age + " anos"}
                  </Text>
                  <Text strong>Objetivo:</Text>
                  <Text>{patient?.goal}</Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text strong>Endereço:</Text>
                  <Text>{patient?.address.street}</Text>
                  <Text strong>Cidade/Estado:</Text>
                  <Text>{patient?.address.city ?? ''} / {patient?.address.state}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <EditPatientModal
          visible={isEditing}
          patient={patientEditing}
          onCancel={closeEditModal}
          onSave={saveEdit}
        />
        <Col span={8}>
          {patient?.records && (
            <LineChart width={400} height={300} data={patient.records}>
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
            <Typography.Title level={2}>Consultas</Typography.Title>
          </Divider>
          <Button><Link to={`/appointments/create/${Number(id)}`}>Agendar consulta</Link></Button>
          <PatientTable patientId={Number(id)} />
        </Col>
      </Row>
    </SiderComponent>
  );
};