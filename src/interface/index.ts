export interface IProduct {
  id: string | number;
  image: string;
  title: string;
  price: number;
  weight: number;
  desc: string;
  compound: string[];
  calories: number;
  categoryId: number | string;
}

export interface ICategory {
  id: string | number;
  name: string;
}

export interface IBasket {
  productId: number | string;
  count: number;
  price: number;
}
