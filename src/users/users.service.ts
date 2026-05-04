import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(
    email: string,
    password: string,
    displayName?: string,
    name?: string,
  ): Promise<User> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email já está em uso');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashed,
      displayName,
      name,
    });
    return this.usersRepository.save(user);
  }
}
