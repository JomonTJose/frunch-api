import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    //  userService = new UserService();
    userController = new UserController(userService);
  });
});
