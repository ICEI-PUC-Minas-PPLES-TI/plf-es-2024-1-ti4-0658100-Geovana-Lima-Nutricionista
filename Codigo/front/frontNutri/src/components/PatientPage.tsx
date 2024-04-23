import { Button, Card, Col, Divider, Flex, Input, Row, Space, Typography } from 'antd';
import SiderComponent from './SiderComponent';
import Meta from 'antd/es/card/Meta';
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { PatientTable } from './PatientTable';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';

const { Text } = Typography;

export const Patientspage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
                title="Maria Eduarda"
                description={
                  <Flex gap="middle" vertical>
                    <p>mariaeduarda@gmail.com</p>
                    <Text strong>Consultas: 20</Text>
                    <Text strong>Total Pago: R$500</Text>
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
                  <Text strong>Professora</Text>
                  <Text>Data de Nascimento</Text>
                  <Text strong>22/02/2003</Text>
                  <Text>Cidade</Text>
                  <Text strong>Belo Horizonte</Text>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical" size="middle">
                  <Text>Objetivo</Text>
                  <Text strong>Emagrecer</Text>
                  <Text>Estado</Text>
                  <Text strong>Minas Gerais</Text>
                  <Text>Endereço</Text>
                  <Text strong>Rua ABC 123</Text>
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
