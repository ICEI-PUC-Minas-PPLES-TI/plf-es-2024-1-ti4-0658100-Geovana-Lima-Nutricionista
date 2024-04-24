// PatientsList.tsx
import { useEffect, useState } from "react";
import { Card, List, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import SiderComponent from "../components/SiderComponent";
import "../index.css";
import { Patient } from "../interfaces/patient";
import { deletePatient, getPatients } from "../services/patient.service";
import { useNavigate } from "react-router-dom";

export const PatientsList = () => {
  const navigate = useNavigate();
  document.title = "Busca de Pacientes";
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const loadPatients = async () => {
      const { data, error } = await getPatients();
      if (data) {
        setPatients(data);
      }
      if (data?.length === 0) {
        notification.info({
          message: "Não há pacientes cadastrados",
        });
      }
      else {
        if (error) {
          notification.error({
            message: "Erro ao buscar pacientes!",
          });
        }
      }
    };

    loadPatients();
  }, []);

  const showEditModal = (patient: Patient) => {
    localStorage.setItem("patient",JSON.stringify(patient) );
    navigate('/see-patient');
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

  return (
    <SiderComponent>
      <div className="patientList">
        <List
          grid={{ column: 4 }}
          renderItem={(patient: Patient, index) => {
            return (
              <Card
                className="itemCard"
                key={index}
                actions={[
                  <>
                    <Button
                      className="button"
                      onClick={() => showEditModal(patient)}
                    >
                      Ver Paciente
                    </Button>
                    <Button
                      className="button"
                      onClick={() => handleDelete(Number(patient.id))}
                    >
                      Excluir paciente
                    </Button>
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
      </div>
    </SiderComponent>
  );
};
