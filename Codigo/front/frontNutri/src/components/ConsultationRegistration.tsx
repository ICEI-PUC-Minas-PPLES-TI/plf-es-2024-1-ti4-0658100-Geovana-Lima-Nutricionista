import {
    Row,
    Col,
    Form,
    Input,
    DatePicker,
    Button,
} from "antd";
import "../index.css";
import "moment/locale/pt-br";
import moment from "moment";

export const ConsultationRegistration = () => {
    return(
<div>
    <Row gutter={24}>
        <Col span={12}>
            <Form.Item
                name="name"
                label="Nome"
                rules={[
                    {
                        required: true,
                        message: "Por favor escreva o nome do paciente",
                    },
                ]}
            >
                <Input placeholder="Escreva o nome do paciente" />
            </Form.Item>
        </Col>
    </Row>

    <Row gutter={24}>
        <Col span={12}>
            <Form.Item
                name="consultationDate"
                label="Data da Consulta"
                rules={[
                    {
                        required: true,
                        message: "Por favor digite a data da consulta do paciente",
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || value.isBefore(moment(), "day")) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("A data da consulta deve ser no futuro")
                            );
                        },
                    }),
                ]}
            >
                <DatePicker
                    style={{ width: "100% " }}
                    picker="date"
                    placeholder="Escreva a data da consulta do paciente"
                    format="DD-MM-YYYY"
                />
            </Form.Item>
        </Col>
    </Row>
    <Col span={12}>
        <Form.Item
            name="consultationTime"
            label="Hora da Consulta"
            rules={[
                {
                    required: true,
                    message: "Por favor digite a hora da consulta do paciente",
                },
            ]}
        >
            <Input placeholder="Escreva a hora da consulta do paciente" />
        </Form.Item>
    </Col>
    <Row gutter={24}>
        <Form.Item
            name="value"
            label="Valor da Consulta"
            rules={[
                {
                    required: true,
                    message: "Por favor digite o valor da consulta do paciente",
                },
            ]}
        >
            <Input placeholder="Escreva o valor da consulta do paciente" />
        </Form.Item>
        <Col span={12}>
            <Form.Item
                name="paymentLink"
                label="Link de pagamento"
                rules={[
                    {
                        required: true,
                        message: "Por favor digite o link de pagamento da consulta",
                    },
                ]}
            >
                <Input placeholder="Escreva o link de pagamento da consulta" />
            </Form.Item>
        </Col>
    </Row>
    <Form.Item>
        <Button
            key="submit"
            htmlType="submit"
            type="primary"
            className="button"
        >
            Criar nova consulta
        </Button>
    </Form.Item>
</div>
    )
}
