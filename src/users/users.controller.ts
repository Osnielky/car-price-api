import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  @Get()
  findAll(@Query() email: string) {
    console.log(email);
    
    return this.userService.find(email);
  }
}
