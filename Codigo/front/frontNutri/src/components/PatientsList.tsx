// PatientsList.tsx
import React, { useEffect, useState } from "react";
import { Card, List, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import EditPatientModal from "../components/EdiPatientModal";
import SiderComponent from "./SiderComponent";
import "../index.css";
import { Patient } from "../interfaces/patient";
import { deletePatient, getPatients } from "../services/patient.service";

export const PatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const loadPatients = async () => {
      const { data, error } = await getPatients();

      if (data) {
        setPatients(data);
      }

      if (error) {
        notification.error({
          message: "Erro ao buscar pacientes!",
        });
      }
    };

    loadPatients();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const showEditModal = (patient: Patient) => {
    setEditedPatient(patient);
    setIsModalVisible(true);
    setIsEditing(false);
  };

  const handleDelete = async (patientId: number) => {
    const { error } = await deletePatient(patientId);

    if (!error) {
      notification.success({
        message: "Paciente excluído com sucesso!",
      });
      // remover paciente do array
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

  const handleEditSubmit = (values: any) => {
    if (editedPatient) {
      const updatedPatient = {
        ...editedPatient,
        ...values,
        birthDate: values.birthDate.format("DD-MM-YYYY"),
      };

      console.log("Dados do paciente atualizados:", updatedPatient);
      setEditedPatient(updatedPatient);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <SiderComponent>
      <div className="patientList">
        <List
          grid={{ column: 3 }}
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
        {/* Modal de edição */}
        <EditPatientModal
          visible={isModalVisible}
          onCancel={handleCancel}
          editedPatient={editedPatient}
          onSubmit={handleEditSubmit}
        />
      </div>
    </SiderComponent>
  );
};
