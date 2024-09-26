import Title from "antd/es/typography/Title";
import { Button, Divider } from "antd";
import { IProduct } from "@src/interface";
import { BasketProduct } from "@components/BasketProduct";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "@src/store/orders";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

export const Basket = () => {
	const userId =
		useSelector((state: RootState) => state.auth.userId) ||
		(localStorage.getItem("userId")
			? JSON.parse(localStorage.getItem("userId") || "null")
			: null) ||
		null;

	const {
		data: basket,
		isLoading: basketLoading,
		error: basketError,
	} = useGetOrdersQuery(userId as string);

	const navigate = useNavigate();

	if (basketLoading)
		return (
			<>
				<div className="flex items-center justify-between">
					<Title level={3}>Корзина</Title>
					<div
						className="bg-white w-10 h-7 flex justify-center items-center"
						style={{ borderRadius: "10px" }}
					>
						0
					</div>
				</div>
				<div
					className="py-6 px-4 bg-white"
					style={{ borderRadius: "18px" }}
				>
					<div>Тут пока пусто :(</div>
				</div>
			</>
		);

	if (basketError) {
		console.error("basketError", basketError);
		return (
			<>
				<div className="flex items-center justify-between">
					<Title level={3}>Корзина</Title>
					<div
						className="bg-white w-10 h-7 flex justify-center items-center"
						style={{ borderRadius: "10px" }}
					>
						0
					</div>
				</div>
				<div
					className="py-6 px-4 bg-white"
					style={{ borderRadius: "18px" }}
				>
					<div>Тут пока пусто :(</div>
				</div>
			</>
		);
	}

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
					{basket.items.length || 0}
				</div>
			</div>
			{basket.items.length ? (
				<div>
					<Divider style={{ marginBlock: "12px" }} />
					{basket.items.map(
						(b: {
							product: IProduct;
							quantity: number;
							price: number;
						}) => {
							return (
								<div key={b.product.id}>
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
						<p className="text-lg">{basket.total} sum</p>
					</div>
					<Button
						type="primary"
						className="w-full h-10"
						style={{ borderRadius: "12px" }}
						onClick={() => {
							navigate(
								"?" +
									queryString.stringify({
										submit: true,
									})
							);
						}}
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
		// <div className="flex justify-between">
		//   <Skeleton. />
		// </div>
	);
};
