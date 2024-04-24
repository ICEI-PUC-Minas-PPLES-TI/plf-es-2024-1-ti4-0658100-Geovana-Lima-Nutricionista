import {  Card, Col, Divider, Flex, Row, Space, Typography } from 'antd';
import SiderComponent from './SiderComponent';
import Meta from 'antd/es/card/Meta';
import { UserOutlined } from "@ant-design/icons";
import { PatientTable } from './PatientTable';
import { useState, useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import CardPatient from './PatientRecordCard';
import { createPatientRecord, getPatientRecordPatient, updatePatientRecord } from '../services/record.service';
import { RecordProps } from '../interfaces/Record';
import { getPatient } from '../services/patient.service';
import { Patient } from '../interfaces/patient';

const { Text } = Typography;

export const Patientspage = () => {
  const r= {
    id:0,
    weight: '',
    height: '',
    physicalActivities: '',
    imc: '',
    waist: '',
    bust: '',
    observations: ''
  };
  const p={
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
    }
  }
  const a = JSON.parse(localStorage.getItem('patient')??JSON.stringify(p));


  const [patientRecord, setPatientRecord] = useState<RecordProps>(r);
  const [patient, setPatient] = useState<Patient>(a);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient(a.id);
        setPatient(response.data);
      } catch (error:any) {
        console.error('Erro ao obter o registro do paciente:', error.message);
      }

      try {
        const response = await getPatientRecordPatient(a.id);
        setPatientRecord(response);
      } catch (error:any) {

        console.error('Erro ao obter o registro do paciente:', error.message);
      }

      

    };

    fetchData();
  }, []); 

 function updateRecord (Record :any){
  console.log(patient)
    updatePatientRecord(patientRecord.id, Record).then((success:any)=>{setPatientRecord(success)});
  }

  function createRecord (Record :any){
    Record.patientId=a.id;
    console.log(Record);
    createPatientRecord(Record).then((success:any)=>{setPatientRecord(success)});
    }


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
                title={patient.name}
                description={
                  <Flex gap="middle" vertical>
                    <p>{patient.email}</p>
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
                  <Text strong>{patient.occupation}</Text>
                  <Text>Data de Nascimento</Text>
                  <Text strong>{new Date(patient.birthDate).toLocaleDateString('pt-BR')}</Text>
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
          <CardPatient record={patientRecord}onUpdate={updateRecord}onCreate={createRecord}/>
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
