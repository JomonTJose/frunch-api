import { Injectable, Inject, Get, Query } from '@nestjs/common';
import { PG_CONNECTION } from '../config/configuration';
import { IProduct, IProducts } from './product.interface';

@Injectable()
export class ProductService {
  constructor(@Inject(PG_CONNECTION) private conn: any) { }

  async productsbyRestaurantId(resID: number) {
    let products: IProduct[] = [];
    try {
      const sqlQuery = `SELECT p.id, p.product_name,p.price,floor(avg( pr.rating))::integer as rating, pr.review , c.cuisine_name , p.product_image_url FROM products p INNER JOIN product_reviews pr ON p.id = pr.product_id INNER JOIN restaurants  r ON p.restaurant_id = r.id INNER JOIN cuisine_category c ON p.cuisine_id  = c.id WHERE r.id  = ${resID} group by ( p.id, p.product_name, pr.review , c.cuisine_name , p.product_image_url)`;
      console.log(sqlQuery);
      const res = await this.conn.query(sqlQuery);
      console.log(res);
      products = res.rows;
      return products;
    }
    catch (error) {
      throw new Error(error);
    }
  }
}
