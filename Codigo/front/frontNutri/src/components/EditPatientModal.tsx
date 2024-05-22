// EditPatientModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Patient } from '../interfaces/patient';

interface EditPatientModalProps {
  visible: boolean;
  patient: Patient | null;
  onCancel: () => void;
  onSave: (values: any) => void;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({ visible, patient, onCancel, onSave }) => {
  return (
    <Modal
      title="Editar Paciente"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        initialValues={patient ? patient : {}}
        onFinish={onSave}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: 'Por favor insira o nome do paciente!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Por favor insira o email do paciente!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="occupation"
          label="Ocupação"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="goal"
          label="Objetivo"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="adress"
          label="Endereço"
        >
          <Input />
          </Form.Item>
          <Form.Item
          name="city/state"
          label="Cidade/Estado"
        >
          <Input />
          </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='button'>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPatientModal;
