import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { RecordProps } from '../interfaces/Record';

function CardPatient({ record, onUpdate }:RecordProps) {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = () => {
    
    onUpdate();
    setShowModal(false);
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Ficha</Card.Title>
          <Card.Text>
            <strong>Peso:</strong> {record.weight} kg<br />
            <strong>Altura:</strong> {record.height} cm<br />
            <strong>Atividades Físicas:</strong> {record.physicalActivities}<br />
            <strong>IMC:</strong> {record.imc}<br />
            <strong>Medidas: </strong> Cintura: {record.waist} cm, Busto: {record.bust} cm<br />
            <strong>Observações:</strong> {record.observations}<br />
          </Card.Text>
          <Button variant="primary" onClick={handleEdit}>Editar</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardPatient;
