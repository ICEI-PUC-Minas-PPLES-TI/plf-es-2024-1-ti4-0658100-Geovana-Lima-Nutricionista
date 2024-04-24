import { useState } from 'react';
import { Button, Card, Input, Modal, Space } from 'antd';
import { RecordProps } from '../interfaces/Record';
import {  EditOutlined } from "@ant-design/icons";

function CardPatient({ record, onUpdate, onCreate }: { record: RecordProps; onUpdate: (rec:RecordProps) => void; onCreate: (rec:RecordProps) => void }) {

const [editedRecord, setEditedRecord] = useState(record);
  
const [showModal, setShowModal] = useState(false);

const [showModalCreate, setShowModalCreate] = useState(record.id==0);

  const handleEdit = () => {
    setEditedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalCreate(false);
  };

  const handleUpdate = () => {
    onUpdate(editedRecord);
    setShowModal(false);
  };
  const handleCreate = () => {
    
    onCreate(editedRecord);
    console.log(editedRecord);
  };
  

  return (

    
    <div>
       <Card
            title={
              <Space>
                <span>Ficha</span>
                <Button className='button' shape="circle" icon={<EditOutlined />} onClick={handleEdit} />
              </Space>
            }
            bordered={false}
          >
        <p>
          <strong>Peso:</strong> {record.weight} kg<br />
          <strong>Altura:</strong> {record.height} cm<br />
          <strong>Atividades Físicas:</strong> {record.physicalActivities}<br />
          <strong>IMC:</strong> {record.imc}<br />
          <strong>Medidas:</strong> Cintura: {record.waist} cm, Busto: {record.bust} cm<br />
          <strong>Observações:</strong> {record.observations}<br />
        </p>
      </Card>

  <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
  <h2>Editar Paciente</h2>
  <strong>Peso:</strong> <Input value={editedRecord.weight} onChange={(e) => setEditedRecord({ ...editedRecord, weight: e.target.value })} placeholder="Peso" /><br />
  <strong>Altura:</strong> <Input value={editedRecord.height} onChange={(e) => setEditedRecord({ ...editedRecord, height: e.target.value })} placeholder="Altura" /><br />
  <strong>Atividades Físicas:</strong> <Input value={editedRecord.physicalActivities} onChange={(e) => setEditedRecord({ ...editedRecord, physicalActivities: e.target.value })} placeholder="Atividades Físicas" /><br />
  <strong>IMC:</strong> <Input value={editedRecord.imc} onChange={(e) => setEditedRecord({ ...editedRecord, imc: e.target.value })} placeholder="IMC" /><br />
  <strong>Medidas:</strong> Cintura: <Input value={editedRecord.waist} onChange={(e) => setEditedRecord({ ...editedRecord, waist: e.target.value })} placeholder="Cintura" />Busto: <Input value={editedRecord.bust} onChange={(e) => setEditedRecord({ ...editedRecord, bust: e.target.value })} placeholder="Busto" /><br />
  <strong>Observações:</strong> <Input value={editedRecord.observations} onChange={(e) => setEditedRecord({ ...editedRecord, observations: e.target.value })} placeholder="Observações" /><br />

  <Button onClick={handleCloseModal}>Fechar</Button>
  <Button type="primary" onClick={handleUpdate}>Salvar Alterações</Button>
  </Modal>
  <Modal open={false} onCancel={handleCloseModal} footer={null}>
  <h2>Criar Ficha</h2>
  <strong>Peso:</strong> <Input value={editedRecord.weight} onChange={(e) => setEditedRecord({ ...editedRecord, weight: e.target.value })} placeholder="Peso" /><br />
  <strong>Altura:</strong> <Input value={editedRecord.height} onChange={(e) => setEditedRecord({ ...editedRecord, height: e.target.value })} placeholder="Altura" /><br />
  <strong>Atividades Físicas:</strong> <Input value={editedRecord.physicalActivities} onChange={(e) => setEditedRecord({ ...editedRecord, physicalActivities: e.target.value })} placeholder="Atividades Físicas" /><br />
  <strong>IMC:</strong> <Input value={editedRecord.imc} onChange={(e) => setEditedRecord({ ...editedRecord, imc: e.target.value })} placeholder="IMC" /><br />
  <strong>Medidas:</strong> Cintura: <Input value={editedRecord.waist} onChange={(e) => setEditedRecord({ ...editedRecord, waist: e.target.value })} placeholder="Cintura" />Busto: <Input value={editedRecord.bust} onChange={(e) => setEditedRecord({ ...editedRecord, bust: e.target.value })} placeholder="Busto" /><br />
  <strong>Observações:</strong> <Input value={editedRecord.observations} onChange={(e) => setEditedRecord({ ...editedRecord, observations: e.target.value })} placeholder="Observações" /><br />
  
  <Button type="primary" onClick={handleCreate}>Salvar Alterações</Button>
  </Modal>
    </div>
  );
}

export default CardPatient;
