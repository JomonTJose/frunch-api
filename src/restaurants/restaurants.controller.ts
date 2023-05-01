import { Get, Controller, Res, Post, Body } from '@nestjs/common';
import { RestaurantService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantService) { }
  @Get()
  async getRestaurants(@Res() response): Promise<any> {

    const restaurants = await this.restaurantService.getRestaurants();
    console.log(restaurants);
    return response.send(restaurants);

  }

  @Post('restaurantByCuisines')
  async getRestaurantsByCuisine(
    @Body() cuisine_name: string[],
    @Res() response,
  ) {
    try {
      const restaurants = await this.restaurantService.getRestaurantsbyCuisine(
        cuisine_name
      );
      return response.send(restaurants);
    } catch (err) {
      return response.status(err);
    }
  }
}
