import React, { useState } from 'react';
import {
  Button,
  Typography,
  Modal,
  notification,
  Table,
  Select,
  Switch,
  ConfigProvider,
} from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Appointment } from '../interfaces/appointment';
import { AppointmentEditModal } from './AppointmentEditModal';
import PatientRecordModal from './PatientRecordModal';
import {
  deleteAppointment,
  updateAppointment,
} from '../services/appointment.service';
import { RecordProps } from '../interfaces/record';
import { Link } from 'react-router-dom';

interface DailyViewProps {
  date: string;
  appointments: Appointment[];
  onBack: () => void;
  onUpdateAppointments: (updatedAppointments: Appointment[], date: string) => void;
}

const mockAppointment: Appointment = {
  date: "",
  hour: "",
  price: "",
  status: "",
  paymentLink: "",
  paid: false,
  record: null,
};

interface RecordModal {
  showRecordModal: boolean;
  recordModal: RecordProps | null;
  appointmentRecordModal: Appointment;
}

export const DailyView: React.FC<DailyViewProps> = ({ date, appointments, onBack, onUpdateAppointments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentEditing, setAppointmentEditing] = useState<Appointment | null>(null);
  const [recordModal, setRecordModal] = useState<RecordModal>({
    showRecordModal: false,
    recordModal: null,
    appointmentRecordModal: mockAppointment,
  });

  const columns = [
    {
      key: "1",
      title: "Hora",
      dataIndex: "hour",
    },
    {
      key: "2",
      title: "Paciente",
      dataIndex: ["patient", "name"],
      render: (text: string, record: Appointment) => (
        <Link to={`/patients/${record?.patient?.id}`}>
          {record?.patient?.name}
        </Link>
      ),
    },
    {
      key: "3",
      title: "Valor Pago",
      dataIndex: "price",
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
      render: (text: string, record: Appointment) => (
        <Select
          defaultValue={record.status}
          onChange={(value: string) => handleChangeStatus(record, value)}
        >
          <Select.Option value="MARCADO">Marcado</Select.Option>
          <Select.Option value="CANCELADO">Cancelado</Select.Option>
          <Select.Option value="ADIADO">Adiado</Select.Option>
          <Select.Option value="CONCLUIDO">Concluído</Select.Option>
        </Select>
      ),
    },
    {
      key: "6",
      title: "Pago",
      dataIndex: "paid",
      render: (text: string, record: Appointment) => (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#cb6cec",
            },
          }}
        >
          <Switch
            checked={record.paid}
            onChange={(checked: boolean) => handleChangePaid(record, checked)}
          />
        </ConfigProvider>
      ),
    },
    {
      key: "7",
      title: "Ficha",
      render: (record: Appointment) => {
        return (
          <Button onClick={() => handleRecord(record)}>
            {record.record != null ? "Editar ficha" : "Criar ficha"}
          </Button>
        );
      },
    },
    {
      key: "8",
      title: "Ações",
      render: (record: Appointment) => (
        <>
          <EditOutlined onClick={() => onEditAppointment(record)} />
          <DeleteOutlined onClick={() => onDeleteAppointment(record)} style={{ color: "red", marginLeft: 12 }} />
        </>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    await deleteAppointment(id);
    notification.success({ message: "Consulta deletada com sucesso!" });
  };

  const onDeleteAppointment = (record: Appointment) => {
    Modal.confirm({
      title: "Você tem certeza que deseja deletar essa consulta?",
      okText: "Sim",
      okType: "danger",
      onOk: async () => {
        await handleDelete(Number(record.id));
        const updatedAppointments = appointments.filter(appointment => appointment.id !== record.id);
        onUpdateAppointments(updatedAppointments, record.date);
      },
    });
  };

  const onEditAppointment = (record: Appointment) => {
    setAppointmentEditing(record);
    setIsEditing(true);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setAppointmentEditing(null);
  };

  const handleChangeStatus = async (record: Appointment, value: string) => {
    const updatedRecord = { ...record, status: value };
    await updateAppointment(Number(record.id), updatedRecord);
    notification.success({ message: "Status da consulta atualizado com sucesso!" });
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === record.id ? updatedRecord : appointment
    );
    onUpdateAppointments(updatedAppointments, record.date);
  };

  const handleChangePaid = async (record: Appointment, value: boolean) => {
    const updatedRecord = { ...record, paid: value };
    await updateAppointment(Number(record.id), updatedRecord);
    notification.success({ message: "Status de pagamento da consulta atualizado com sucesso!" });
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === record.id ? updatedRecord : appointment
    );
    onUpdateAppointments(updatedAppointments, record.date);
  };

  const handleRecord = (appointment: Appointment) => {
    setRecordModal({
      showRecordModal: true,
      appointmentRecordModal: appointment,
      recordModal: appointment.record,
    });
  };

  const closeRecordModal = () => {
    setRecordModal({ ...recordModal, showRecordModal: false });
  };

  return (
    <div>
      <Typography.Title level={4}>
        Consultas para {date}
      </Typography.Title>
      <Table columns={columns} dataSource={appointments} />
      <Button onClick={onBack} style={{ marginTop: '10px' }}>
        Voltar
      </Button>
      {appointmentEditing && (
        <AppointmentEditModal
          appointment={appointmentEditing}
          resetEditing={resetEditing}
          isEditing={isEditing}
        />
      )}
      {recordModal.showRecordModal && (
        <PatientRecordModal
          showModal={recordModal.showRecordModal}
          closeModal={closeRecordModal}
          appointment={recordModal.appointmentRecordModal}
          record={recordModal.recordModal}
        />
      )}
    </div>
  );
};
