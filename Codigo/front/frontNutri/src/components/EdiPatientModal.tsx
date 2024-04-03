import React, { useState, useEffect } from 'react';
import { Modal, Button, message } from 'antd';
import { PatientFormModal } from './PatientFormModal';
import '../index.css'
interface EditPatientModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editedPatient: any; 
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({ visible, onCancel, onSubmit, editedPatient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditedPatient, setCurrentEditedPatient] = useState<any>(null);
  const [messageApi] = message.useMessage();

  useEffect(() => {
    setCurrentEditedPatient(editedPatient); 
  }, [visible, editedPatient]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    onSubmit(currentEditedPatient);
    success(); // Exibe a mensagem de sucesso após salvar as alterações
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Salvo com sucesso!',
    });
  };

  return (
    <Modal
      title="Detalhes do Paciente"
      className='modal'
      open={visible} 
      onCancel={onCancel}
      footer={[
        !isEditing && (
          <Button key="edit" type="primary" onClick={handleEditButtonClick} className='button'>
            Editar
          </Button>
        ),
        isEditing && (
          <Button key="save" type="primary" onClick={handleSaveButtonClick} className='button'>
            Salvar
          </Button>
        ),
      ]}
    >
      <PatientFormModal
        initialValues={currentEditedPatient} 
        onSubmit={onSubmit}
        onCancel={onCancel}
        isInModal={true}
        isEditing={isEditing}
      />
    </Modal>
  );
};

export default EditPatientModal;
