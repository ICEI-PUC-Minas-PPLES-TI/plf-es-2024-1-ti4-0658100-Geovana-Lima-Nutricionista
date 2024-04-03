import React, { useEffect, useState } from 'react';
import { Card, List, Popover, Button} from 'antd';
import { EditOutlined } from '@ant-design/icons'; // Importar o ícone de edição
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import Meta from 'antd/es/card/Meta';
import PatientData from './Mock';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditPatientModal from './EdiPatientModal';
import { Patient } from '../interfaces/patient';
import { getPatients } from '../services/patient.service';

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

    // Estado para controlar se o modal de edição está visível ou não
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Função para abrir o modal de edição
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
                birthDate: values.birthDate.format('DD-MM-YYYY'), // Converter a data de volta para o formato desejado
            };
            
            console.log('Dados do paciente atualizados:', updatedPatient);
            setEditedPatient(updatedPatient);
        }
        setIsModalVisible(false);
    };

   
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };


    return (
        <div>
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
                                avatar={<UserOutlined />}
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
                isEditing={isEditing}
            />
            
        </div>
    )
}


