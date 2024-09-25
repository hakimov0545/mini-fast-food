import Title from "antd/es/typography/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@src/store/auth";
import { useEffect } from "react";
import { setCredentials } from "@src/store/authSlice";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login] = useLoginMutation();
	const onFinish = async () => {
		const data = form.getFieldsValue();
		const res = await login(data);
		if (res) {
			localStorage.setItem("token", res.data.accessToken);
			localStorage.setItem(
				"userId",
				JSON.stringify(res.data.userId)
			);
			navigate("/");
			dispatch(
				setCredentials({
					userId: res.data.userId,
					token: res.data.accessToken,
				})
			);
		}
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
