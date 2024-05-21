import { ConfigProvider, DatePicker, Form, Input, Modal } from 'antd';
import 'dayjs/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';
import React from 'react'
import { Appointment } from '../interfaces/appointment';

interface EventFormProps {
    visible: boolean;
    onCreate: (values: Appointment) => void;
    onCancel: () => void;
  }

export const ModalAddAppointment: React.FC<EventFormProps> = ({ visible, onCreate, onCancel }) => {
const [form] = Form.useForm();
  
const handleOk = () => {
    form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
          open={visible}
          title="Adicionar Consulta"
          okText="Adicionar"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={handleOk}
        >
          <Form form={form} layout="vertical" name="event_form">
            <Form.Item
              name="date"
              label="Data"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione uma data!',
                },
              ]}
            >
            <ConfigProvider locale={locale}>
              <DatePicker format="DD/MM/YYYY" />
              </ConfigProvider>
            </Form.Item>
            <Form.Item
              name="hour"
              label="Hora"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira uma hora!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Preço"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira um preço!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira um status!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="paymentLink"
              label="Link de Pagamento"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira um link de pagamento!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      );
}
