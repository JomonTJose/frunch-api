export interface IProduct {
  id: number;
  product_name: string;
  cuisine_name: string;
  price: number;
  product_image: string;
  rating: number;
  review: string;
}

export interface IProducts {
  products: IProduct[];
}
