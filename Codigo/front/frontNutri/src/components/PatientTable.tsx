import { useEffect, useState } from 'react'
import { Input, Modal, notification, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Appointment } from '../interfaces/appointment';
import { getPatientAppointments } from '../services/appointment.service';

export const PatientTable = ({patientId}:{patientId: number}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [dataSource, setDataSource] = useState<Appointment[]>([])

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
  }, [])

  const columns =[
    {
      key:'1',
      id:1,
      title:'Data',
      dataIndex:'date'
    },
    {
      key:'2',
      id:2,
      title:'Hora',
      dataIndex:'hour'
    },
    {
      key:'3',
      id:3,
      title:'Valor Pago',
      dataIndex:'price'
    },
    {
      key:'4',
      id:4,
      title:'Link de Pagamento',
      dataIndex:'paymentLink'
    },
    {
      key:'5',
      id:5,
      title:'Status',
      dataIndex:'status'
    },
    {
      key:'6',
      title:'Ações',
      render: (record: Appointment) => {
        return (
          <>
            <EditOutlined onClick={() => {
              onEditAppointment(record)
            }}/>
            <DeleteOutlined onClick={() => {
              onDeleteAppointment(record)
            }}
            style={{color: "red", marginLeft: 12}}/>
          </>
        )
      }
    },
  ]

  const onDeleteAppointment=(record: Appointment) => {
      Modal.confirm({
        title: 'Você tem certeza que deseja deletar essa consulta?',
        okText: 'Sim',
        okType: 'danger',
        onOk:()=> { 
         setDataSource(pre => pre.filter(appointment => appointment.id !== record.id))
        }
      })
  }

  const onEditAppointment=(record: Appointment)=>{
    setIsEditing(true)
    setEditingAppointment({...record})
  }
  
  const resetEditing=()=>{
    setIsEditing(false);
    setEditingAppointment(null)

  }
  return (
    <div>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
        title="Editar Consulta"
        open={isEditing}
        okText="Salvar"
        onCancel={() => {
          resetEditing()
        }}
        onOk={()=> {
          setDataSource(pre=>{
            return pre.map(appointment=>{
              if(appointment.id === editingAppointment?.id){
                return editingAppointment!;
              }else{
                return appointment;
              }
            })
          })
          resetEditing()
        }}
        >
        <Input value={editingAppointment?.date} onChange={(e) => {
          setEditingAppointment(pre=>{
            return {...pre!, date: e.target.value}
          })
        }}
          />
        <Input value={editingAppointment?.time} onChange={(e) => {
          setEditingAppointment(pre=>{
            return {...pre!, time: e.target.value}
          })
        }}/>
        <Input value={editingAppointment?.amount} onChange={(e) => {
          setEditingAppointment(pre=>{
            return {...pre!, amount: e.target.value}
          })
        }}/>
        <Input value={editingAppointment?.paymentLink} onChange={(e) => {
          setEditingAppointment(pre=>{
            return {...pre!, paymentLink: e.target.value}
          })
        }}/>
        <Input value={editingAppointment?.status} onChange={(e) => {
          setEditingAppointment(pre=>{
            return {...pre!, status: e.target.value}
          })
        }}/>

        </Modal>
    </div>
  )
}
