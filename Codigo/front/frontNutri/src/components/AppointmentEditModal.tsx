import { ConfigProvider, Input, Modal, notification, DatePicker, TimePicker } from "antd";
import { Appointment } from "../interfaces/appointment";
import { useState, useEffect } from "react";
import { updateAppointment } from "../services/appointment.service";
import locale from 'antd/lib/locale/pt_BR';
import dayjs, { Dayjs } from 'dayjs';

interface AppointmentEditModalInterface {
  resetEditing: () => void;
  appointment: Appointment;
  isEditing: boolean;
}

interface EditingAppointment extends Omit<Appointment, 'date' | 'hour'> {
  date: Dayjs | null;
  hour: Dayjs | null;
}

export const AppointmentEditModal = ({
  appointment,
  resetEditing,
  isEditing
}: AppointmentEditModalInterface) => {
  const mock: EditingAppointment = {
    date: null,
    hour: null,
    price: '',
    status: '',
    paymentLink: '',
    record: null,
    paid: false
  };

  const [editingAppointment, setEditingAppointment] = useState<EditingAppointment>({
    ...mock,
    date: appointment.date ? dayjs(appointment.date) : null,
    hour: appointment.hour ? dayjs(appointment.hour, 'HH:mm') : null,
  });

  useEffect(() => {
    if (isEditing) {
      setEditingAppointment({
        ...appointment,
        date: appointment.date ? dayjs(appointment.date) : null,
        hour: appointment.hour ? dayjs(appointment.hour, 'HH:mm') : null
      });
    }
  }, [isEditing, appointment]);

  const handleUpdate = async (record: Appointment) => {
    const updatedAppointment: Appointment = {
      ...editingAppointment,
      date: editingAppointment.date ? editingAppointment.date.format('YYYY-MM-DD') : '',
      hour: editingAppointment.hour ? editingAppointment.hour.format('HH:mm') : ''
    };

    const { data } = await updateAppointment(Number(record.id), updatedAppointment);

    if (data) {
      notification.success({
        message: "Consulta atualizada com sucesso!",
      });
    }
    resetEditing();
    setEditingAppointment(mock);
  };

  return (
    <Modal
      title="Editar Consulta"
      open={isEditing}
      okText="Salvar"
      onCancel={() => {
        resetEditing();
        setEditingAppointment(mock);
      }}
      onOk={() => {
        handleUpdate(appointment);
      }}
    >
      <ConfigProvider locale={locale}>
        <div>
          Data
          <DatePicker
            style={{ width: '100%' }}
            value={editingAppointment.date}
            onChange={(date) => {
              setEditingAppointment((prev) => ({
                ...prev,
                date
              }));
            }}
          />
        </div>
        <div>
          Hora
          <TimePicker
            style={{ width: '100%' }}
            value={editingAppointment.hour}
            format="HH:mm"
            onChange={(time) => {
              setEditingAppointment((prev) => ({
                ...prev,
                hour: time
              }));
            }}
          />
        </div>
      </ConfigProvider>
      <div>
        Preço
        <Input
          value={editingAppointment.price}
          onChange={(e) => {
            setEditingAppointment((prev) => ({
              ...prev,
              price: e.target.value
            }));
          }}
        />
      </div>
      <div>
        Status
        <Input
          value={editingAppointment.status}
          onChange={(e) => {
            setEditingAppointment((prev) => ({
              ...prev,
              status: e.target.value
            }));
          }}
        />
      </div>
    </Modal>
  );
};
