import { Modal, Form, Input, InputNumber, Button } from "antd";
import { Appointment } from "../interfaces/appointment";
import { RecordProps } from "../interfaces/record";
import {
  createPatientRecord,
  updatePatientRecord,
} from "../services/record.service";
import styled from "styled-components";

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

function PatientRecordModal({
  appointment,
  record,
  closeModal,
  showModal,
}: {
  appointment: Appointment;
  record: RecordProps | null;
  closeModal: () => void;
  showModal: boolean;
}) {
  const mock: RecordProps = {
    bust: 0,
    height: 0,
    imc: 0,
    observations: "",
    physicalActivities: "",
    weight: 0,
    waist: 0,
  };
  const [form] = Form.useForm();

  const onFinish = (values: RecordProps) => {
    if (record == null) {
      createPatientRecord(values, Number(appointment.id));
    } else {
      updatePatientRecord(Number(record.id), values);
    }

    closeModal();
  };

  return (
    <Modal
      title={record ? "Editar Ficha do Paciente" : "Nova Ficha do Paciente"}
      onCancel={closeModal}
      footer={null}
      open={showModal}
    >
      <Form form={form} onFinish={onFinish} initialValues={record ?? mock}>
        <Form.Item label="Peso" name="weight">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Altura" name="height">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Atividades Físicas" name="physicalActivities">
          <Input />
        </Form.Item>
        <Form.Item label="IMC" name="imc">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Cintura" name="waist">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Busto" name="bust">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Observações" name="observations">
          <Input.TextArea />
        </Form.Item>
        <Buttons>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {record ? "Salvar" : "Criar"}
            </Button>
          </Form.Item>
          <Button onClick={() => closeModal()}>
            Cancelar
          </Button>
        </Buttons>
      </Form>
    </Modal>
  );
}

export default PatientRecordModal;
