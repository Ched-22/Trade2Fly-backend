import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: Array<{ id: number } & CreateUserDto> = [];

  create(data: CreateUserDto) {
    const user = {
      id: Date.now(),
      ...data,
    };

    this.users.push(user);

    return user;
  }
}
