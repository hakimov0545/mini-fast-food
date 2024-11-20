import Title from "antd/es/typography/Title";
import { Button, Col, Modal, Row } from "antd";
import queryString from "query-string";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IOrderItem, IProduct } from "@src/interface";
import { useState } from "react";
import basketStore from "@src/mobx/basketStore";
import { observer } from "mobx-react";

export const FirstModal = observer(
	({ products }: { products: IProduct[] }) => {
		const location = useLocation();
		const navigate = useNavigate();
		const handleClose = () => {
			navigate("?" + queryString.stringify({}));
		};

		const [count, setCount] = useState<number>(1);
		const { basket, addToBasket, updateProductCount } =
			basketStore;

		const params = queryString.parse(location.search, {
			parseNumbers: true,
			parseBooleans: true,
		});

		const onFinish = (item: IProduct) => {
			const userId = localStorage.getItem("userId");
			if (userId) {
				const existItem = basket.find(
					(f: IOrderItem) =>
						f.product.documentId === item.documentId
				);

				if (existItem) {
					updateProductCount(count, item.documentId);
				} else {
					addToBasket({
						quantity: count,
						product: item,
						price: item.price,
					});
				}
				setCount(1);
				handleClose();
			} else {
				navigate("/login");
			}
		};

		return (
			<Modal
				footer={null}
				open={Boolean(params.add)}
				className="custom-modal md:rounded-3xl"
				title={(() => {
					const item = products?.find(
						(item) => item.documentId === params.id
					);
					return item ? (
						<Title level={3} className="modal-title">
							{item.title}
						</Title>
					) : (
						"No product title"
					);
				})()}
				onCancel={handleClose}
			>
				{(() => {
					const item = products?.find(
						(item) => item.documentId === params.id
					);
					return item ? (
						<div>
							<Row>
								<Col
									sm={11}
									className="flex flex-col justify-between"
								>
									<img
										src={`http://localhost:1337/${item.image.url}`}
										alt="product image"
										style={{
											width: "100%",
											borderRadius: "16px",
											height: "200px",
										}}
									/>
									<Button
										type="primary"
										className="w-full h-8 mt-10 fm-dobavit"
										style={{
											borderRadius: "8px",
										}}
										onClick={() => {
											onFinish(item);
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
										<p
											style={{
												fontSize: "16px",
											}}
										>
											{item.description}
										</p>
										<Title level={5}>
											Состав:
										</Title>
										{/* <ul>
										{item.compound.map(
											(c, index) => (
												<li key={index}>
													{c}
												</li>
											)
										)}
									</ul> */}
										<p
											style={{
												fontSize: "16px",
											}}
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
													setCount(
														count + 1
													)
												}
											/>
										</div>
										<Title
											level={3}
											className="!mb-0"
										>
											{item.price * count} $
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
	}
);
