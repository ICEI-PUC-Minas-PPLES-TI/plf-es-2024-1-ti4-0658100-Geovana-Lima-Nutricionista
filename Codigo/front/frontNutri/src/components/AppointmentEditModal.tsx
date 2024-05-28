import { Input, Modal, notification } from "antd";
import { Appointment } from "../interfaces/appointment";
import { useState } from "react";
import { updateAppointment } from "../services/appointment.service";

interface AppointmentEditModalInterface {
  resetEditing: () => void;
  appointment: Appointment;
  isEditing: boolean;
}

export const AppointmentEditModal = ({
  appointment,
  resetEditing,
  isEditing
}: AppointmentEditModalInterface) => {
  const mock: Appointment = {
    date: '',
    hour: '',
    price: '',
    status: '',
    paymentLink: '',
    record: null,
    paid: false
  }
  const [editingAppointment, setEditingAppointment] = useState<Appointment>(mock);

  const handleUpdate = async (record: Appointment) => {
    const { data } = await updateAppointment(
      Number(record.id),
      editingAppointment
    );

    if (data) {
      notification.success({
        message: "Consulta atualizada com sucesso!",
      });
    }
    resetEditing()
    setEditingAppointment(mock);
  };

  return (
    <Modal
      title="Editar Consulta"
      open={isEditing}
      okText="Salvar"
      onCancel={() => {
        resetEditing();
      }}
      onOk={() => {
        handleUpdate(appointment);
        resetEditing();
      }}
    >
      Data
      <Input
        value={appointment.date}
        onChange={(e) => {
          setEditingAppointment((pre) => {
            return { ...pre!, date: e.target.value };
          });
        }}
      />
      Hora
      <Input
        value={appointment.hour}
        onChange={(e) => {
          setEditingAppointment((pre) => {
            return { ...pre!, hour: e.target.value };
          });
        }}
      />
      Preço
      <Input
        value={appointment.price}
        onChange={(e) => {
          setEditingAppointment((pre) => {
            return { ...pre!, price: e.target.value };
          });
        }}
      />
      Link
      <Input
        value={appointment.paymentLink}
        onChange={(e) => {
          setEditingAppointment((pre) => {
            return { ...pre!, paymentLink: e.target.value };
          });
        }}
      />
      Status
      <Input
        value={appointment.status}
        onChange={(e) => {
          setEditingAppointment((pre) => {
            return { ...pre!, status: e.target.value };
          });
        }}
      />
    </Modal>
  );
};
