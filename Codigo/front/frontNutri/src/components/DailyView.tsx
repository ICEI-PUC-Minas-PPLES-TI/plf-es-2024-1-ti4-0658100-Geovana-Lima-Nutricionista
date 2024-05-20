import React from 'react';
import { Button, List, Typography } from 'antd';
import { Appointment } from '../interfaces/appointment';

interface DailyViewProps {
  date: string;
  appointments: Appointment[];
  onBack: () => void;
}

export const DailyView: React.FC<DailyViewProps> = ({ date, appointments, onBack }) => {
  return (
    <div>
      <Typography.Title level={4}>
        Consultas para {date}
      </Typography.Title>
      <List
        dataSource={appointments}
        renderItem={(appointment) => (
          <List.Item>
            <List.Item.Meta
              title={appointment.hour}
              description={appointment.patient?.name}
            />
          </List.Item>
        )}
      />
      <Button onClick={onBack} style={{ marginTop: '10px' }}>
        Voltar
      </Button>
    </div>
  );
};
