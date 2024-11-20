import Title from "antd/es/typography/Title";
import { Button, Divider, message } from "antd";
import { IProduct } from "@src/interface";
import { BasketProduct } from "@components/BasketProduct";
import { useMutation } from "@tanstack/react-query";
import { api } from "@src/api";
import { useNavigate } from "react-router-dom";
import basketStore from "@src/mobx/basketStore";
import { observer } from "mobx-react";

export const Basket = observer(() => {
	const { basket, removeBasket, total } = basketStore;

	const navigate = useNavigate();

	const { mutate: add } = useMutation(
		(data: Record<string, any>) => {
			return api.post(`/orders`, {
				data,
			});
		},
		{
			onSuccess: () => {
				message.success("Successfully add");
				removeBasket();
			},
			onError: () => {
				message.error("Error");
			},
		}
	);

	const onFinish = () => {
		const userId = localStorage.getItem("token");

		if (userId) {
			const data = {
				user: localStorage.getItem("userId"),
				items: basket.map((b) => ({
					quantity: b.quantity,
					price: b.price,
					product: b.product.id,
				})),
			};

			add(data);
		} else {
			navigate("/login");
		}
	};

	// return (
	// 	<>
	// 		<div className="flex items-center justify-between">
	// 			<Title level={3}>Корзина</Title>
	// 			<div
	// 				className="bg-white w-10 h-7 flex justify-center items-center"
	// 				style={{ borderRadius: "10px" }}
	// 			>
	// 				0
	// 			</div>
	// 		</div>
	// 		<div
	// 			className="py-6 px-4 bg-white"
	// 			style={{ borderRadius: "18px" }}
	// 		>
	// 			<div>Тут пока пусто :(</div>
	// 		</div>
	// 	</>
	// );

	return (
		<div
			className="py-6 px-4 bg-white"
			style={{ borderRadius: "18px" }}
		>
			<div className="flex items-center justify-between">
				<Title level={3}>Корзина</Title>
				<div
					className="bg-[#F2F2F3] w-10 h-5 flex justify-center"
					style={{ borderRadius: "6px" }}
				>
					{basket?.length || 0}
				</div>
			</div>
			{basket?.length ? (
				<div>
					<Divider style={{ marginBlock: "12px" }} />
					{basket.map(
						(b: {
							product: IProduct;
							quantity: number;
							price: number;
						}) => {
							return (
								<div key={b.product.documentId}>
									<BasketProduct
										product={b.product}
										quantity={b.quantity}
									/>
									<Divider
										style={{
											marginBlock: "12px",
										}}
									/>
								</div>
							);
						}
					)}
					<div className="flex justify-between items-center mb-4">
						<p className="text-lg">Итого</p>
						<p className="text-lg">{total} $</p>
					</div>
					<Button
						type="primary"
						className="w-full h-10"
						style={{ borderRadius: "12px" }}
						onClick={onFinish}
					>
						Оформить заказ
					</Button>
					<div className="flex items-center gap-2 mt-2">
						<img src="/dostavka.svg" alt="dostavka" />
						<p>Бесплатная доставка</p>
					</div>
				</div>
			) : (
				<div>Тут пока пусто :(</div>
			)}
		</div>
	);
});
