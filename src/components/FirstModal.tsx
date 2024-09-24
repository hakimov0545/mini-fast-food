import Title from "antd/es/typography/Title";
import { Alert, Button, Col, Modal, Row } from "antd";
import queryString from "query-string";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IBasket, IProduct } from "@src/interface";
import { useState } from "react";
import {
	useCreateOrderMutation,
	useGetOrdersQuery,
} from "@src/store/orders";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { Loading } from "./Loading";

export const FirstModal = ({
	products,
}: {
	products: IProduct[];
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const handleClose = () => {
		navigate("?" + queryString.stringify({}));
	};

	const [count, setCount] = useState<number>(1);
	const user = useSelector((state: RootState) => state.auth.user);
	const {
		data: basket,
		isLoading: basketLoading,
		error: basketError,
	} = useGetOrdersQuery(user?.username as string);
	const [createOrder] = useCreateOrderMutation();

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	if (basketLoading) return <Loading />;
	if (basketError) {
		console.error(basketError);
		return (
			<Alert
				message="Error fetching orders"
				type="error"
				closable
			/>
		);
	}

	return (
		<Modal
			footer={null}
			open={Boolean(params.add)}
			className="custom-modal md:rounded-3xl"
			title={(() => {
				const item = products?.find(
					(item) => item.id === params.id
				);
				return item ? (
					<Title level={3}>{item.title}</Title>
				) : (
					"No product title"
				);
			})()}
			onCancel={handleClose}
		>
			{(() => {
				const item = products?.find(
					(item) => item.id === params.id
				);
				return item ? (
					<div>
						<Row>
							<Col
								sm={11}
								className="flex flex-col justify-between"
							>
								<img
									src={item.image}
									alt="product image"
									style={{
										width: "100%",
										borderRadius: "16px",
										height: "200px",
									}}
								/>
								<Button
									type="primary"
									className="w-full h-8 mt-10"
									style={{ borderRadius: "8px" }}
									onClick={() => {
										if (
											localStorage.getItem(
												"token"
											)
										) {
											const existingItem =
												basket.find(
													(
														basketItem: IBasket
													) =>
														basketItem.productId ===
														item.id
												);
											if (existingItem) {
												setBasket(
													basket.map(
														(
															basketItem: IBasket
														) =>
															basketItem.productId ===
															item.id
																? {
																		...basketItem,
																		count:
																			basketItem.quantity +
																			count,
																	}
																: basketItem
													)
												);
											} else {
												createOrder({
													userId: user?.id as string,
													productId:
														item.id,
													quantity: count,
												});
											}

											setCount(1);
											handleClose();
										} else {
											navigate("/login");
										}
									}}
								>
									Добавить
								</Button>
							</Col>
							<Col
								sm={13}
								className="ps-4 flex flex-col justify-between"
							>
								<div>
									<p style={{ fontSize: "16px" }}>
										{item.description}
									</p>
									<Title level={5}>Состав:</Title>
									<ul>
										{item.compound.map(
											(c, index) => (
												<li key={index}>
													{c}
												</li>
											)
										)}
									</ul>
									<p
										style={{ fontSize: "16px" }}
										className="text-gray-600"
									>
										{item.weight}г, ккал{" "}
										{item.calories}
									</p>
								</div>
								<div className="flex justify-between mt-6">
									<div
										className="w-20 h-8 flex items-center justify-around bg-[#F2F2F3]"
										style={{
											borderRadius: "8px",
										}}
									>
										<FaMinus
											onClick={() => {
												if (count > 1)
													setCount(
														count - 1
													);
											}}
											style={{
												fontSize: "12px",
												cursor: "pointer",
											}}
										/>
										{count}
										<FaPlus
											style={{
												fontSize: "12px",
												cursor: "pointer",
											}}
											onClick={() =>
												setCount(count + 1)
											}
										/>
									</div>
									<Title
										level={3}
										className="!mb-0"
									>
										{item.price * count} sum
									</Title>
								</div>
							</Col>
						</Row>
					</div>
				) : (
					<div>No product found</div>
				);
			})()}
		</Modal>
	);
};
