import { Get, Controller, Res, Post, Body, Param, Query } from '@nestjs/common';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Get('ByRestaurantId')
    public async ProductsByRestaurantId(@Query('resId') resId: string, @Res() response) {
        const products: IProduct[] = await this.productsService.productsbyRestaurantId(parseInt(resId));
        return response.send(products);
    }

}