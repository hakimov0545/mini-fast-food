import Title from "antd/es/typography/Title";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@src/api";

export const LoginPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const { mutate: login } = useMutation(
		(data: { identifier: string; password: string }) => {
			return api.post(`/auth/local`, data);
		},
		{
			onSuccess: (res) => {
				console.log({ res });

				localStorage.setItem("token", res.data.jwt);
				localStorage.setItem(
					"userId",
					JSON.stringify(res.data.user.id)
				);
				navigate("/");
			},
			onError: (error) => {
				message.error(
					"Login failed. Please check your credentials."
				);
				console.error(error);
			},
		}
	);

	const onFinish = async () => {
		const data = form.getFieldsValue();
		login(data);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) navigate("/");
	}, []);

	return (
		<div className="text-center flex items-center justify-center h-[100vh]">
			<div>
				<Title level={2}>Login</Title>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
				>
					<Form.Item
						name="identifier"
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
					<Button
						type="primary"
						htmlType="submit"
						className="w-full"
					>
						Login
					</Button>
				</Form>
				<p className="text-gray-600 text-sm mt-2">
					Don't have an account?{" "}
					<a
						onClick={() => {
							navigate("/register");
						}}
						style={{
							borderBottom: "1px solid gray",
							cursor: "pointer",
						}}
					>
						Register
					</a>
				</p>
			</div>
		</div>
	);
};
