import { IProduct } from "@src/interface";
import { RootState } from "@src/store";
import { useCreateOrderMutation } from "@src/store/orders";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { message } from "antd";

export const BasketProduct = ({
	product,
	quantity,
}: {
	product: IProduct;
	quantity: number;
}) => {
	const userId =
		useSelector((state: RootState) => state.auth.userId) ||
		(localStorage.getItem("userId")
			? JSON.parse(localStorage.getItem("userId") || "null")
			: null) ||
		null;

	const [createOrder] = useCreateOrderMutation();

	const updateProductCount = async (
		reason: "APPEND" | "REMOVE"
	) => {
		try {
			await createOrder({
				productId: product.id,
				userId,
				quantity: 1,
				reason,
			});
		} catch (error) {
			console.error("Error updating product count:", error);
		}
	};

	const deleteBasketProduct = async () => {
		try {
			await createOrder({
				productId: product.id,
				userId,
				quantity,
				reason: "REMOVE",
			});

			message.success("Product deleted");
		} catch (error) {
			console.error("Error deleting product:", error);
			message.error("Error");
		}
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
							if (quantity > 1) {
								updateProductCount("REMOVE");
							} else {
								deleteBasketProduct();
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
							updateProductCount("APPEND");
						}}
					/>
				</div>
			</div>
		</div>
	);
};
