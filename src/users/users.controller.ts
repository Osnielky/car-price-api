import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';


@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }
  @UseInterceptors(new SerializeInterceptor(UserDto)) // ways to exclude password basen on a decorator in the user.entity file
  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      return null;
    }
    return user;
  }

  @Get()
  findAll(@Query('email') email: string) {
    console.log(email);

    return this.userService.find(email);
  }

  @Delete('/id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    console.log(parseInt(id));

    return this.userService.update(parseInt(id), body);
  }
}
