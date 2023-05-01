import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { PG_CONNECTION } from '../config/configuration';
import { UserService } from './user.service';

const mockConn = {
  query: jest.fn(),
};

const mockConfigProvider = {
  provide: PG_CONNECTION,
  useValue: mockConn,
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, mockConfigProvider],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockRows = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    mockConn.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await userService.getUsers();

    expect(mockConn.query).toHaveBeenCalledWith('select * from users');
    expect(result).toEqual(mockRows);
  });

  it('should return rated restaurants for given user id', async () => {
    const mockRows = [
      {
        restaurant_name: 'Restaurant A',
        rating: 4,
        review: 'Good food',
        created_at: '2022-04-26',
      },
    ];
    mockConn.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await userService.getRatedRestaurants(1);

    const expectedQuery = `SELECT r.id, r.restaurant_name, AVG(rr.rating) AS average_rating, rr.review, r.res_image
    FROM restaurants r
    INNER JOIN restaurant_reviews rr ON r.id = rr.restuarant_id
    INNER JOIN users u ON rr.user_id = u.id
    WHERE u.id = 1
    GROUP BY (r.id, rr.review)
    ORDER BY average_rating DESC`;
    expect(mockConn.query).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(mockRows);
  });
});
