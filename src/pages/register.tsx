import Title from "antd/es/typography/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@src/store/auth";
import { useEffect } from "react";

export const RegisterPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [register] = useRegisterMutation();
	const onFinish = async () => {
		const data = form.getFieldsValue();

		const res = await register(data);

		if (res) {
			localStorage.setItem("token", res.data.accessToken);
			navigate("/");
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) navigate("/");
	}, []);
	return (
		<div className="text-center flex items-center justify-center h-[100vh]">
			<div>
				<Title level={2}>Register</Title>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
				>
					<Form.Item
						name="fullname"
						label="Fullname"
						rules={[
							{
								required: true,
								message: "Please enter your fullname",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="username"
						label="Username"
						rules={[
							{
								required: true,
								message: "Please enter your username",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please enter your password",
							},
						]}
					>
						<Input type="password" />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone"
						rules={[
							{
								required: true,
								message: "Please enter your phone",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="w-full"
					>
						Register
					</Button>
				</Form>
				<p className="text-gray-600 text-sm mt-2">
					Already have an account?{" "}
					<a
						onClick={() => {
							navigate("/login");
						}}
						style={{
							borderBottom: "1px solid gray",
							cursor: "pointer",
						}}
					>
						Login
					</a>
				</p>
			</div>
		</div>
	);
};
