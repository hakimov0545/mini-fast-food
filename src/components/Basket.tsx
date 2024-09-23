import Title from "antd/es/typography/Title";
import { Button, Divider } from "antd";
import { IBasket, IProduct } from "@src/interface";
import { BasketProduct } from "@components/BasketProduct";
import queryString from "query-string";
import { useContext } from "react";
import { BasketContext } from "@src/App";
import { useGetProductsQuery } from "@store/products";
import { useNavigate } from "react-router-dom";

export const Basket = () => {
	const { basket, sum } = useContext(BasketContext);
	const { data: products, isLoading: ProductLoading } =
		useGetProductsQuery(undefined);
	const navigate = useNavigate();

	if (ProductLoading) return <div>Корзина</div>;

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
					{basket.length}
				</div>
			</div>
			{basket.length ? (
				<div>
					<Divider style={{ marginBlock: "12px" }} />
					{basket.map((b: IBasket) => {
						const product = products.find(
							(p: IProduct) => p.id == b.productId
						);
						return (
							<div key={product.id}>
								<BasketProduct product={product} />
								<Divider
									style={{ marginBlock: "12px" }}
								/>
							</div>
						);
					})}
					<div className="flex justify-between items-center mb-4">
						<p className="text-lg">Итого</p>
						<p className="text-lg">{sum} sum</p>
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
