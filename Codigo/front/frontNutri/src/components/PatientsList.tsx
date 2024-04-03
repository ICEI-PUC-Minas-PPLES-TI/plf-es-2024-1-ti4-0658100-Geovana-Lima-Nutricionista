// PatientsList.tsx
import React, { useState } from 'react';
import { Card, List, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import PatientData from './Mock';
import EditPatientModal from '../components/EdiPatientModal'; 
import SiderComponent from './SiderComponent';
import '../index.css';
import { IconBaseProps } from 'react-icons';

export const PatientsList = () => {
    const items: Patient[] = [];

    useEffect(() => {
        const loadPatients = async () => {
            const { data, error } = await getPatients();

            if (data) {
                items.push(...data);
            }

            if (error) {
                console.log(error);
            }
        }

        loadPatients();
    } )

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const showEditModal = (patient: Patient) => {
        setEditedPatient(patient);
        setIsModalVisible(true);
        setIsEditing(false);
    };

    const handleEditSubmit = (values: any) => {
        if (editedPatient) {
            const updatedPatient = {
                ...editedPatient,
                ...values,
                birthDate: values.birthDate.format('DD-MM-YYYY'),
            };

            console.log('Dados do paciente atualizados:', updatedPatient);
            setEditedPatient(updatedPatient);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <SiderComponent>
            <div className='patientList'>
                <List
                    grid={{ column: 3 }}
                    renderItem={(patient: Patient, index) => {
                        return (
                            <Card
                                className='itemCard'
                                key={index}
                                actions={[
                                    <Button
                                        className='button'
                                        onClick={() => showEditModal(patient)}
                                    >
                                        Ver Paciente
                                    </Button>
                                ]}
                            >
                                <Meta
                                    className='meta'
                                    avatar={patient.icon}
                                    title={patient.name}
                                    description={patient.goal}
                                />
                            </Card>
                        )
                    }}
                    dataSource={items}
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

    )
}
