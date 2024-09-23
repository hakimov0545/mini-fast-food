import { IBasket, IProduct } from "@src/interface";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { BasketContext } from "@src/App";

export const BasketProduct = ({ product }: { product: IProduct }) => {
	const { basket, setBasket } = useContext(BasketContext);
	const basketProduct: IBasket = basket.find(
		(p: IBasket) => p.productId === product.id
	) || { productId: product.id, count: 1, price: product.price };

	const updateProductCount = (
		id: string | number,
		newCount: number
	) => {
		const updatedBasket = basket.map((item) =>
			item.productId === id
				? { ...item, count: newCount }
				: item
		);
		setBasket(updatedBasket);
	};

	const deleteBasketProduct = (id: string | number) => {
		const updatedBasket = basket.filter(
			(item) => item.productId !== id
		);
		setBasket(updatedBasket);
	};

	return (
		<div className="flex">
			<img
				src={product.image}
				alt="product"
				style={{ borderRadius: "10px" }}
				className="w-16 h-12"
			/>
			<div className="flex items-center justify-between ms-2 w-full">
				<div>
					<p>{product.title}</p>
					<p className="text-gray-600">{product.weight}г</p>
					<p>{product.price} sum</p>
				</div>
				<div
					className="w-20 h-8 flex items-center justify-around bg-[#F2F2F3]"
					style={{ borderRadius: "8px" }}
				>
					<FaMinus
						onClick={() => {
							if (basketProduct.count > 1) {
								updateProductCount(
									product.id,
									basketProduct.count - 1
								);
							} else {
								deleteBasketProduct(product.id);
							}
						}}
						style={{
							fontSize: "12px",
							cursor: "pointer",
						}}
					/>
					{basketProduct.count}
					<FaPlus
						style={{
							fontSize: "12px",
							cursor: "pointer",
						}}
						onClick={() => {
							updateProductCount(
								product.id,
								basketProduct.count + 1
							);
						}}
					/>
				</div>
			</div>
		</div>
	);
};
