import { IOrderItem } from "@src/interface";
import { makeAutoObservable } from "mobx";

class BasketStore {
	basket: IOrderItem[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get total() {
		return this.basket.reduce((total, order) => {
			return total + order.price * order.quantity;
		}, 0);
	}

	setBasket(basket: IOrderItem[]) {
		this.basket = basket;
	}

	addToBasket = (value: IOrderItem) => {
		this.basket = [...this.basket, value];
	};

	updateProductCount = (value: number, documentId: string) => {
		const updatedBasket = this.basket.map((item) => {
			if (item.product.documentId === documentId) {
				return {
					...item,
					quantity: item.quantity + value,
				};
			}
			return item;
		});

		this.basket = updatedBasket;
	};

	deleteBasketProduct = (documentId: string) => {
		const filteredBasket = this.basket.filter(
			(b: IOrderItem) => b.product.documentId !== documentId
		);

		this.basket = filteredBasket;
	};

	removeBasket = () => {
		this.basket = [];
	};
}

const basketStore = new BasketStore();
export default basketStore;
