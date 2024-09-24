import Title from "antd/es/typography/Title";
import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@src/store/auth";
import { useEffect, useState } from "react";
import { setCredentials } from "@src/store/authSlice";
import { useGetUserByUsernameQuery } from "@src/store/user";
import { useDispatch } from "react-redux";
import { Loading } from "@src/components/Loading";

export const LoginPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useGetUserByUsernameQuery(username);

	const [login] = useLoginMutation();
	const onFinish = async () => {
		const data = form.getFieldsValue();
		setUsername(data.username);
		const res = await login(data);
		if (res) {
			localStorage.setItem("token", res.data.accessToken);
			navigate("/");
			dispatch(
				setCredentials({ user, token: res.data.accessToken })
			);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) navigate("/");
	}, []);

	if (userLoading) return <Loading />;
	if (userError) {
		console.error(userError);
		return (
			<Alert
				message="Error fetching user"
				type="error"
				closable
			/>
		);
	}
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
