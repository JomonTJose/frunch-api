import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../config/configuration';
import { createRatingsDto, RatingsDTO } from './ratings.dto';

@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private conn: any) { }

  async getUsers() {
    try {

      const res = await this.conn.query('select * from users');
      return res.rows;
    }
    catch (err) {
      throw new Error(err);
    }
  }
  /*x
  Get Previously rated restaurants by the user
  */
  async getRatedRestaurants(userId: number) {
    const selectQuery = `SELECT r.id, r.restaurant_name, AVG(rr.rating) AS average_rating, rr.review, r.res_image
    FROM restaurants r
    INNER JOIN restaurant_reviews rr ON r.id = rr.restuarant_id
    INNER JOIN users u ON rr.user_id = u.id
    WHERE u.id = ${userId}
    GROUP BY (r.id, rr.review)
    ORDER BY average_rating DESC`;
    const res = await this.conn.query(selectQuery);
    return res.rows;
  }

  async saveRestaurantRatings(ratingsDTO: createRatingsDto) {
    console.log(ratingsDTO);
    const review: string = ratingsDTO.review;
    const userId: number = ratingsDTO.user_id;
    const rating: number = ratingsDTO.rating;
    const resId: number = ratingsDTO.restaurant_id;
    const save_query =
      "call SaveRestaurantRatings('" +
      review +
      "'," +
      userId +
      ',' +
      rating +
      ',' +
      resId +
      ');';
    console.log(save_query);
    const res = await this.conn.query(save_query);
    console.log(res);
    return res;
  }
}
