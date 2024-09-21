import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { FaPhone } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="px-8 py-12 bg-white">
      <Row>
        <Col md={12} className="w-full">
          <img src={"/footerLogo.svg"} alt="footer" />
          <p className="md:mt-10">
            © YouMeal, 2022 <br /> Design: Anastasia Ilina
          </p>
        </Col>
        <Col md={12} className="w-full">
          <Row>
            <Col sm={12} xs={24} className="mt-3 md:mt-0">
              <Title level={4}>Номер для заказа</Title>
              <div className="flex items-center gap-2 mt-4">
                <FaPhone />
                <p className="text-lg">+7(930)833-38-11</p>
              </div>
            </Col>
            <Col sm={12} xs={24} className="mt-3 md:mt-0">
              <Title level={4}>Мы в соцсетях</Title>
              <div className="flex gap-4 mt-4">
                <Button shape="circle" type="primary" className="w-9 h-9">
                  <FaVk className="text-white" />
                </Button>
                <Button shape="circle" type="primary" className="w-9 h-9">
                  <FaTelegramPlane className="text-white" />
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};
