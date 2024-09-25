export interface IProduct {
	id: string | number;
	image: string;
	title: string;
	price: number;
	weight: number;
	description: string;
	compound: string[];
	calories: number;
	category: string;
}

export interface ICategory {
	id: string | number;
	icon: string;
	title: string;
}

export interface IBasket {
	productId: number | string;
	quantity: number;
	userId: number | string;
	reason?: "APPEND" | "REMOVE";
}

export interface IBasketInfo {
	id: number | string;
	userId: number | string;
	items: [
		{
			product: IProduct;
			quantity: number;
			price: number;
		},
	];
	count: number;
	total: number;
}

export interface IBasketConfirm {
	orderId: number | string;
	fullname: string;
	phone: string;
	type: "PICKUP" | "DELIVERY";
	address?: {
		street: string;
		apartmentNumber: string;
		buildingNumber: string;
		intercom: string;
	};
}

export interface IUserRegister {
	fullname: string;
	username: string;
	password: string;
	phone: string;
}

export interface IUser {
	fullname: string;
	username: string;
	phone: string;
	id: number | string;
}
