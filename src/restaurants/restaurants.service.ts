import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../config/configuration';
import { ICuisine, IRestaurant } from './restaurant.interface';

@Injectable()
export class RestaurantService {
  constructor(@Inject(PG_CONNECTION) private conn: any) { }

  async getRestaurants() {
    try {
      const sqlQuery = 'select * from "' + "RestaurantsListwithRatingsView" + '"';
      console.log(sqlQuery);
      const res = await this.conn.query(sqlQuery);

      const restaurants = res.rows;
      return restaurants;
    } catch (err: unknown) {
      throw new Error(`Error occured while fetching data. Error: ${err}`);
    }
  }

  async getAllCusines() {
    try {
      const res = await this.conn.query('select * from cuisine_category');
      const cusines: ICuisine = res.rows;
      return cusines;
    } catch (error) {
      throw new Error(`Error occured while fetching data. Error: ${error}`);
    }
  }

  async getRestaurantsbyCuisine(cuisine_name: string[]) {
    let filterQuery = "'" + cuisine_name[0] + "'";
    for (let index = 1; index < cuisine_name.length; index++) {
      filterQuery += ",'";
      filterQuery += cuisine_name[index] + "'";
    }
    console.log(filterQuery);
    const sqlQuery =
      'select  restaurant_name, id, cuisine_name, "location", address, average_rating, review, res_image from "RestaurantsListwithRatingsView" where cuisine_name in (' + filterQuery + ' )';
    console.log(sqlQuery);
    const res = await this.conn.query(sqlQuery);
    return res.rows;
  }
}
