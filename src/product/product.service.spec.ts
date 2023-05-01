import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PG_CONNECTION } from '../config/configuration';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

const mockConn = {
    query: jest.fn(),
};

const mockConfigProvider = {
    provide: PG_CONNECTION,
    useValue: mockConn,
};

const sqlQuery = `SELECT p.id, p.product_name,p.price,floor(avg( pr.rating))::integer as rating, pr.review , c.cuisine_name , p.product_image_url FROM products p INNER JOIN product_reviews pr ON p.id = pr.product_id INNER JOIN restaurants  r ON p.restaurant_id = r.id INNER JOIN cuisine_category c ON p.cuisine_id  = c.id WHERE r.id  = 1 group by ( p.id, p.product_name, pr.review , c.cuisine_name , p.product_image_url)`;
describe('Product Service', () => {
    let productService: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, mockConfigProvider],
        }).compile();

        productService = module.get<ProductService>(ProductService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should return no products based on restaurant id prodcuts are not in the database', async () => {

        const mockRows: IProduct[] = [];
        mockConn.query.mockResolvedValueOnce({ rows: mockRows });
        const result = await productService.productsbyRestaurantId(1);
        expect(mockConn.query).toHaveBeenCalledWith(
            sqlQuery,
        );
        console.log(result);
        expect(result.length).toBe(0);
    });

    it('Should return all products based on restaurant_id', async () => {
        const mockRows: IProduct[] = [
            {
                id: 1,
                cuisine_name: 'European',
                price: 100,
                product_name: 'ABC',
                rating: 5,
                review: 'Avg',
                product_image: 'dummy.img'
            }
        ]
        mockConn.query.mockResolvedValueOnce({ rows: mockRows });
        const result = await productService.productsbyRestaurantId(1);
        expect(mockConn.query).toHaveBeenCalledWith(
            sqlQuery,
        );
        expect(result.length).toBe(1);
    })
});
