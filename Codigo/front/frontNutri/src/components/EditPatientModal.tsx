import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { Patient } from '../interfaces/patient';
import moment from 'moment';

interface EditPatientModalProps {
  visible: boolean;
  patient: Patient | null;
  onCancel: () => void;
  onSave: (values: any) => void;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({ visible, patient, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        ...patient,
        birthDate: patient.birthDate ? moment(patient.birthDate) : null,
      });
    }
  }, [patient]);

  return (
    <Modal
      title="Editar Paciente"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        initialValues={patient ? {
          ...patient,
          birthDate: patient.birthDate ? moment(patient.birthDate) : null,
        } : {}}
        onFinish={(values) => {
          const formattedValues = {
            ...values,
            birthDate: values.birthDate ? values.birthDate.toISOString() : null,
          };
          onSave(formattedValues);
        }}
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
          name="birthDate"
          label="Data de Nascimento"
          rules={[{ required: true, message: 'Por favor insira a data de nascimento do paciente!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
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
          name={['address', 'zip']}
          label="CEP"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'state']}
          label="Estado"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'city']}
          label="Cidade"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'district']}
          label="Bairro"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'street']}
          label="Rua"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['address', 'country']}
          label="País"
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
