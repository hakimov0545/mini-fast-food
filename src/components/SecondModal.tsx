import {
	Button,
	Col,
	Form,
	Input,
	message,
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
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { useGetUserByIdQuery } from "@src/store/user";
import { Loading } from "./Loading";
import {
	useConfirmOrderMutation,
	useGetOrdersQuery,
} from "@src/store/orders";

export const SecondModal = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const handleClose = () => {
		navigate("?" + queryString.stringify({}));
	};

	const userId =
		useSelector((state: RootState) => state.auth.userId) ||
		(localStorage.getItem("userId")
			? JSON.parse(localStorage.getItem("userId") || "null")
			: null) ||
		null;

	const { data: user, isLoading: userLoading } =
		useGetUserByIdQuery(userId);

	const { data: basket, isLoading: basketLoading } =
		useGetOrdersQuery(userId as string);

	const [confirmOrder] = useConfirmOrderMutation();

	const [form] = Form.useForm();
	const [dostavka, setDostavka] = useState<string>("DELIVERY");

	useEffect(() => {
		if (user) {
			form.setFieldsValue({
				type: "DELIVERY",
				fullname: user.fullname,
				phone: user.phone,
			});
		}
	}, [form, user]);

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	const onRadioChange = (e: RadioChangeEvent) => {
		form.setFieldsValue({
			type: e.target.value,
		});
		setDostavka(e.target.value);
	};

	const onFinish = () => {
		const res = form.getFieldsValue();
		const data = {
			orderId: basket.id,
			fullname: res.fullname,
			phone: res.phone,
			type: res.type,
			address: {
				street: res.street,
				apartmentNumber: res.apartmentNumber,
				buildingNumber: res.buildingNumber,
				intercom: res.intercom,
			},
		};

		try {
			confirmOrder(data);
			handleClose();
			message.success("Order sent successfully");
		} catch (error) {
			console.error(error);
			message.error("Error");
		}
	};

	if (userLoading || basketLoading) return <Loading />;

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
					style={{ borderRadius: "8px" }}
					md={12}
					className="w-[100%] bg-primary flex items-center justify-center py-24 xl:py-0"
				>
					<img src="/img.svg" alt="image" />
				</Col>
				<Col
					md={12}
					className="bg-[#F9F9F9] flex-1"
					style={{
						width: "100% !important",
						borderRadius: "8px",
						paddingInline: "24px",
						paddingTop: "44px",
						paddingBottom: "24px",
					}}
				>
					<Title level={3}>Доставка</Title>
					<Form
						form={form}
						layout="vertical"
						onFinish={onFinish}
					>
						<Form.Item name="fullname">
							<Input placeholder="Ваше имя" />
						</Form.Item>
						<Form.Item name="phone">
							<Input placeholder="Телефон" />
						</Form.Item>
						<Form.Item name="type">
							<Radio.Group
								onChange={onRadioChange}
								value={dostavka}
							>
								<Space direction="vertical">
									<Radio value="PICKUP">
										Самовывоз
									</Radio>
									<Radio value="DELIVERY">
										Доставка
									</Radio>
								</Space>
							</Radio.Group>
						</Form.Item>
						{dostavka === "DELIVERY" && (
							<>
								<Form.Item name="street">
									<Input placeholder="Улица" />
								</Form.Item>
								<div className="flex gap-2">
									<Form.Item
										name="buildingNumber"
										className="w-[50%]"
									>
										<Input placeholder="Здание" />
									</Form.Item>
									<Form.Item
										name="apartmentNumber"
										className="w-[50%]"
									>
										<Input placeholder="Квартира" />
									</Form.Item>
								</div>
								<Form.Item name="intercom">
									<Input placeholder="Домофон" />
								</Form.Item>
							</>
						)}
						<Button
							type="primary"
							className="w-full h-8 mt-3 sm-oformit"
							style={{ borderRadius: "8px" }}
							htmlType="submit"
						>
							Оформить
						</Button>
					</Form>
				</Col>
			</Row>
		</Modal>
	);
};
