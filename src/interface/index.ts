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
	count: number;
	price: number;
}

export interface IUser {
	fullname: string;
	username: string;
	password: string;
	phone: string;
}
