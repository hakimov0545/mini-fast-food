// export interface IProduct {
// 	id: string | number;
// 	image: string;
// 	title: string;
// 	price: number;
// 	weight: number;
// 	description: string;
// 	compound: string[];
// 	calories: number;
// 	category: string;
// }

// export interface ICategory {
// 	id: string | number;
// 	icon: string;
// 	title: string;
// }

// export interface IBasket {
// 	productId: number | string;
// 	quantity: number;
// 	userId: number | string;
// 	reason?: "APPEND" | "REMOVE";
// }

// export interface IBasketInfo {
// 	id: number | string;
// 	userId: number | string;
// 	items: [
// 		{
// 			product: IProduct;
// 			quantity: number;
// 			price: number;
// 		},
// 	];
// 	count: number;
// 	total: number;
// }

// export interface IBasketConfirm {
// 	orderId: number | string;
// 	fullname: string;
// 	phone: string;
// 	type: "PICKUP" | "DELIVERY";
// 	address?: {
// 		street: string;
// 		apartmentNumber: string;
// 		buildingNumber: string;
// 		intercom: string;
// 	};
// }

// export interface IUserRegister {
// 	fullname: string;
// 	username: string;
// 	password: string;
// 	phone: string;
// }

// export interface IUser {
// 	fullname: string;
// 	username: string;
// 	phone: string;
// 	id: number | string;
// }

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface PaginatedResponse<T> {
	meta: {
		pagination: Pagination;
	};
	data: T[];
}

export interface ItemResponse<T> {
	meta: Record<string, any>;
	data: T;
}

export interface ICategory {
	documentId: string;
	id: number;
	slug: string;
	title: string;
	icon: {
		url: string;
	};
}

export interface IProduct {
	id: number;
	documentId: string;
	title: string;
	image: {
		url: string;
	};
	description: string;
	price: number;
	weight: number;
	calories: number;
	category: ICategory;
}

export interface IRole {
	id: number;
	name: string;
	type: string;
	description: string;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string | null;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	fullname: string;
	phone: string;
	provider: string;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	blocked: boolean;
	confirmed: boolean;
	locale: string | null;
	localizations: any[]; // You can define this more accurately if you know its structure
	orders: IOrder[]; // Array of orders associated with the user
	role: IRole; // Role object for the user
}

export interface IOrder {
	id: number;
	documentId: string;
	user: IUser;
	items: IOrderItem[];
}

export interface IOrderItem {
	product: IProduct;
	quantity: number;
	price: number;
}

export type CategoriesResponse = PaginatedResponse<ICategory>;
export type CategoryResponse = ItemResponse<ICategory>;

export type ProductsResponse = PaginatedResponse<IProduct>;
export type ProductResponse = ItemResponse<IProduct>;

export type OrdersResponse = PaginatedResponse<IOrder>;
export type OrderResponse = ItemResponse<IOrder>;
