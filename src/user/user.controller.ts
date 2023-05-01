import {
  Get,
  Post,
  Controller,
  Res,
  HttpStatus,
  Body,
  Param,
  Put,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { createRatingsDto, RatingsDTO } from './ratings.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  async getUsers(@Res() response): Promise<any> {
    try {
      const users = await this.userService.getUsers();
      return response.send(users);
    } catch (err) {
      console.log(err);
      return response.status(err);
    }
  }

  @Get('ratedrestaurants')
  async getRatedRestaurants(@Query('userid') userid: number, @Res() response) {
    console.log(userid);
    try {
      const rated_res = await this.userService.getRatedRestaurants(userid);
      return response.send(rated_res);
    } catch (err) {
      console.log(err);
      return response.status(500);
    }
  }

  @Post('saveratings')
  async saveRatingsandReviews(
    @Body() ratingsDto: createRatingsDto,
    @Res() response,
  ) {
    try {
      console.log(ratingsDto);
      const isSaved = await this.userService.saveRestaurantRatings(ratingsDto);
      console.log(isSaved);
      return response.send('saved');
    } catch (error) {
      return response.status(500);
    }
  }
}
