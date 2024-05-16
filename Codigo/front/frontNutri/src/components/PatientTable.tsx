import { useEffect, useState } from "react";
import { Button, Modal, notification, Table, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Appointment } from "../interfaces/appointment";
import {
  deleteAppointment,
  getPatientAppointments,
  updateAppointment,
} from "../services/appointment.service";
import { AppointmentEditModal } from "./AppointmentEditModal";
import PatientRecordModal from "./PatientRecordModal";
import { RecordProps } from "../interfaces/record";

interface RecordModal {
  showRecordModal: boolean;
  recordModal: RecordProps | null;
  appointmentRecordModal: Appointment;
}

const mockAppointment: Appointment = {
  date: "",
  hour: "",
  price: "",
  status: "",
  paymentLink: "",
  record: null,
};

export const PatientTable = ({ patientId }: { patientId: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState<Appointment[]>([]);
  const [appointmentEditing, setAppointmentEditing] =
    useState<Appointment | null>(null);
  const [recordModal, setRecordModal] = useState<RecordModal>({
    showRecordModal: false,
    recordModal: null,
    appointmentRecordModal: mockAppointment,
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const loadAppointments = async () => {
      const { data, error } = await getPatientAppointments(patientId);
      if (data) {
        setDataSource(data);
      }
      if (data?.length === 0) {
        notification.info({
          message: "Não há consultas cadastradas",
        });
      } else {
        if (error) {
          notification.error({
            message: "Erro ao carregar consultas",
          });
        }
      }
    };

    loadAppointments();
  }, [patientId]);

  const columns = [
    {
      key: "1",
      id: 1,
      title: "Data",
      dataIndex: "date",
    },
    {
      key: "2",
      id: 2,
      title: "Hora",
      dataIndex: "hour",
    },
    {
      key: "3",
      id: 3,
      title: "Valor Pago",
      dataIndex: "price",
    },
    {
      key: "4",
      id: 4,
      title: "Link de Pagamento",
      dataIndex: "paymentLink",
    },
    {
      key: "5",
      id: 5,
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
      title: "Ficha",
      render: (record: Appointment) => {
        return (
          <>
            <Button onClick={() => handleRecord(record)}>
              {record.record != null ? "Editar ficha" : "Criar ficha"}
            </Button>
          </>
        );
      },
    },
    {
      key: "7",
      title: "Ações",
      render: (record: Appointment) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditAppointment(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteAppointment(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = async (id: number) => {
    await deleteAppointment(id);

    notification.success({
      message: "Consulta deletada com sucesso!",
    });
  };

  const onDeleteAppointment = (record: Appointment) => {
    Modal.confirm({
      title: "Você tem certeza que deseja deletar essa consulta?",
      okText: "Sim",
      okType: "danger",
      onOk: () => {
        handleDelete(Number(record.id));
        setDataSource((pre) =>
          pre.filter((appointment) => appointment.id !== record.id)
        );
      },
    });
  };

  const closeRecordModal = () => {
    setRecordModal({ ...recordModal, showRecordModal: false });
  };

  const onEditAppointment = async (record: Appointment) => {
    setAppointmentEditing(record);
    setIsEditing(true);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setAppointmentEditing(null);
  };

  const handleChangeStatus = (record: Appointment, value: string) => {
    setSelectedStatus(value);
    // Update status locally
    const updatedDataSource = dataSource.map((item) =>
      item.id === record.id ? { ...item, status: value } : item
    );
    setDataSource(updatedDataSource);
    // Send update to API
    updateAppointment(Number(record.id), { ...record, status: value });
  };

  const handleRecord = (appointment: Appointment) => {
    setRecordModal({
      ...recordModal,
      showRecordModal: true,
      appointmentRecordModal: appointment,
      recordModal: appointment.record,
    });
  };

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
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
