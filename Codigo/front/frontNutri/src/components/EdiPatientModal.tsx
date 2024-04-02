import React, { useState } from 'react';
import { Modal, Button, message} from 'antd';
import PatientRegistration from './PatientRegistration';

interface EditPatientModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editedPatient: any;
  isEditing: boolean
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({ visible, onCancel, onSubmit, editedPatient }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Salvo com sucesso!',
    });
  };
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditing(true);

  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    onSubmit(editedPatient && success()); 
  };


  return (
    <Modal
      title="Detalhes do Paciente"
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
      {editedPatient && (
        <PatientRegistration
          initialValues={editedPatient}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isInModal={true}
          isEditing={isEditing}
        />
      )}
    </Modal>
  );
};

export default EditPatientModal;
