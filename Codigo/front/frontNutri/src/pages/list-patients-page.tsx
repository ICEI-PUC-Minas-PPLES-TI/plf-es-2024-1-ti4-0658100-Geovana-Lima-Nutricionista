// PatientsList.tsx
import { useEffect, useState } from "react";
import { Card, List, Button, notification, Input, Col, Row, Modal, Typography } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import SiderComponent from "../components/SiderComponent";
import "../index.css";
import { Patient, PatientSearchParams } from "../interfaces/patient";
import { deletePatient, getPatients } from "../services/patient.service";
import { useNavigate } from "react-router";
import {
  PaginationPatient,
  SearchField,
} from "../styledComponents/Patient/list-patient-styles";

export const PatientsList = () => {
  const navigate = useNavigate();
  document.title = "Busca de Pacientes";
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchParams, setSearchParams] = useState<PatientSearchParams>({
    page: 1,
    per_page: 12,
  });

  useEffect(() => {
    const loadPatients = async () => {
      const { data, error } = await getPatients(searchParams);
      if (data) {
        setPatients(data);
      }
      if (data?.length === 0) {
        notification.info({
          message: "Não há pacientes cadastrados",
        });
      } else {
        if (error) {
          notification.error({
            message: "Erro ao buscar pacientes!",
          });
        }
      }
    };

    loadPatients();
  }, [searchParams]);

  const showEditModal = (patient: Patient) => {
    console.log(patient);
    navigate(Number(patient.id).toString());
  };

  const handleDelete = async (patientId: number) => {
    const { error } = await deletePatient(patientId);

    if (!error) {
      notification.success({
        message: "Paciente excluído com sucesso!",
      });

      const newPatients = patients.filter(
        (patient) => patient.id !== patientId
      );
      setPatients(newPatients);
    }
    if (error) {
      notification.error({
        message: "Erro ao excluir paciente!",
      });
    }
  };

  const onDeleteAppointment = (patientId: number) => {
    Modal.confirm({
      title: "Você tem certeza que deseja deletar essa consulta?",
      okText: "Sim",
      okType: "danger",
      onOk: () => {
        handleDelete(patientId);
      },
    });
  };

  return (
    <SiderComponent>
        <Typography.Title className="title">Pacientes</Typography.Title>
      <div className="patientList">
        <SearchField>
          <SearchOutlined />
          <Input
            width={"200px"}
            onChange={(e) =>
              setSearchParams({ ...searchParams, patient_name: e.target.value })
            }
            placeholder="Digite o nome do paciente"
          />
        </SearchField>

        <List
          grid={{ column: 4 }}
          renderItem={(patient: Patient, index) => {
            return (
              <Card
                className="itemCard"
                key={index}
                actions={[
                  <>
                    <Row>
                      <Col span={8}>
                        <Button
                          className="button"
                          onClick={() => showEditModal(patient)}
                        >
                          <EyeOutlined />
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button
                          className="button"
                          onClick={() => handleDelete(Number(patient.id))}
                        >
                          <DeleteOutlined
                            onClick={() => {
                              onDeleteAppointment(Number(patient.id));
                            }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </>,
                ]}
              >
                <Meta
                  className="meta"
                  avatar={<UserOutlined />}
                  title={patient.name}
                  description={patient.goal}
                />
              </Card>
            );
          }}
          dataSource={patients}
        />

        <PaginationPatient>
          <Button
            type="primary"
            onClick={() => {
              setSearchParams({
                ...searchParams,
                page: searchParams.page - 1,
              });
            }}
            className="button"
            disabled={searchParams.page === 1}
          >
            <DoubleLeftOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSearchParams({
                ...searchParams,
                page: searchParams.page + 1,
              });
            }}
            className="button"
            disabled={patients.length < searchParams.per_page}
          >
            <DoubleRightOutlined />
          </Button>
        </PaginationPatient>
      </div>
    </SiderComponent>
  );
};
