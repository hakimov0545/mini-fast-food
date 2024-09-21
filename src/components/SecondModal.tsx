import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  type RadioChangeEvent,
  Row,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useState, useEffect } from "react";

export const SecondModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("?" + queryString.stringify({}));
  };

  const [form] = Form.useForm();
  const [dostavka, setDostavka] = useState<string>("Доставка");

  useEffect(() => {
    form.setFieldsValue({ dostavka: "Доставка" });
  }, [form]);

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });

  const onRadioChange = (e: RadioChangeEvent) => {
    form.setFieldsValue({ dostavka: e.target.value });
    setDostavka(e.target.value);
  };

  return (
    <Modal
      footer={null}
      open={Boolean(params.submit)}
      className="custom-modal md:rounded-3xl modal-antd"
      onCancel={handleClose}
      style={{ borderRadius: "24px" }}
    >
      <Row style={{ borderRadius: "24px !important" }}>
        <Col
          style={{ borderRadius: "8px 0 0 8px" }}
          lg={12}
          xs={0}
          className="bg-primary flex items-center justify-center"
        >
          <img src="/img.svg" alt="image" />
        </Col>
        <Col
          lg={12}
          md={16}
          sm={20}
          className="bg-[#F9F9F9]"
          style={{
            borderRadius: "8px",
            paddingInline: "24px",
            paddingTop: "44px",
            paddingBottom: "24px",
          }}
        >
          <Title level={3}>Доставка</Title>
          <Form form={form} layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Ваше имя" />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="Телефон" />
            </Form.Item>
            <Form.Item name="dostavka">
              <Radio.Group onChange={onRadioChange} value={dostavka}>
                <Space direction="vertical">
                  <Radio value="Самовывоз">Самовывоз</Radio>
                  <Radio value="Доставка">Доставка</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            {dostavka === "Доставка" && (
              <>
                <Form.Item name="street">
                  <Input placeholder="Улица, дом, квартира" />
                </Form.Item>
                <div className="flex gap-2">
                  <Form.Item name="floor" className="w-[50%]">
                    <Input placeholder="Этаж" />
                  </Form.Item>
                  <Form.Item name="intercom" className="w-[50%]">
                    <Input placeholder="Домофон" />
                  </Form.Item>
                </div>
              </>
            )}
            <Button
              type="primary"
              className="w-full h-8 mt-3"
              style={{ borderRadius: "8px" }}
            >
              Оформить
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
