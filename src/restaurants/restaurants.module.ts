import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantsController],
  providers: [RestaurantService],
})
export class RestaurantsModule {}
