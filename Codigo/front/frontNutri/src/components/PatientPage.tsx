import { Button, Card, Col, Divider, Flex, Input, notification, Row, Space, Typography } from 'antd';
import SiderComponent from './SiderComponent';
import Meta from 'antd/es/card/Meta';
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { PatientTable } from './PatientTable';
import { useEffect, useState } from 'react';
import Title from 'antd/es/typography/Title';
import { useParams } from 'react-router';
import { Patient } from '../interfaces/patient';
import { getPatient } from '../services/patient.service';

const { Text } = Typography;

export const Patientspage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState<Patient|null>();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const loadPatient = async () => {
      const {data, error} = await getPatient(Number(id));

      if (data) {
        setPatient(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao carregar paciente!",
        });

        setPatient(null);
      }
    }

    loadPatient();
  }, [id])

  return (
    <SiderComponent>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <UserOutlined style={{ fontSize: 64 }} />
              </div>
              <Meta
                title={patient?.name}
                description={
                  <Flex gap="middle" vertical>
                    <p>{patient?.email}</p>
                    <Text strong>Consultas: {patient?.totalAppointments ?? 0}</Text>
                    <Text strong>Total Pago: R${patient?.totalPrice ?? 0.00}</Text>
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
                  <Text strong>{patient?.birthDate}</Text>
                  <Text>Cidade</Text>
                  <Text strong>{patient?.address.city}</Text>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text>Objetivo</Text>
                  <Text strong>{patient?.goal}</Text>
                  <Text>Estado</Text>
                  <Text strong>{patient?.address.state}</Text>
                  <Text>Endereço</Text>
                  <Text strong>{patient?.address.street}, {patient?.address.district}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={
              <Space>
                <span>Ficha</span>
                <Button className='button' shape="circle" icon={<EditOutlined />} onClick={handleEditClick} />
              </Space>
            }
            bordered={false}
          >
            <Space direction="vertical" size="middle">
              <Text strong>Peso: {isEditing ? <Input defaultValue="80kg" /> : '80kg'}</Text>
              <Text strong>Altura: {isEditing ? <Input defaultValue="1.65cm" /> : '1.65cm'}</Text>
              <Text strong>Atividades Físicas: {isEditing ? <Input defaultValue="Ginástica" /> : 'Ginástica'}</Text>
              <Text strong>Medidas:</Text>
              <Input.TextArea
                placeholder="Observações"
                autoSize={{ minRows: 2, maxRows: 6 }}
                defaultValue="Observações iniciais"
                disabled={!isEditing}
              />
            </Space>
          </Card>
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
