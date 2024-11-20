import { IProduct } from "@src/interface";
import basketStore from "@src/mobx/basketStore";
import { FaMinus, FaPlus } from "react-icons/fa";
import { observer } from "mobx-react";

export const BasketProduct = observer(
	({
		product,
		quantity,
	}: {
		product: IProduct;
		quantity: number;
	}) => {
		const { updateProductCount, deleteBasketProduct } =
			basketStore;

		return (
			<div className="flex">
				<img
					src={`http://localhost:1337/${product.image.url}`}
					alt="product"
					style={{ borderRadius: "10px" }}
					className="w-16 h-12"
				/>
				<div className="flex items-center justify-between ms-2 w-full">
					<div>
						<p>{product.title}</p>
						<p className="text-gray-600">
							{product.weight}г
						</p>
						<p>{product.price} $</p>
					</div>
					<div
						className="w-20 h-8 flex items-center justify-around bg-[#F2F2F3]"
						style={{ borderRadius: "8px" }}
					>
						<FaMinus
							onClick={() => {
								if (quantity > 1) {
									updateProductCount(
										-1,
										product.documentId
									);
								} else {
									deleteBasketProduct(
										product.documentId
									);
								}
							}}
							style={{
								fontSize: "12px",
								cursor: "pointer",
							}}
						/>
						{quantity}
						<FaPlus
							style={{
								fontSize: "12px",
								cursor: "pointer",
							}}
							onClick={() => {
								updateProductCount(
									1,
									product.documentId
								);
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
);
