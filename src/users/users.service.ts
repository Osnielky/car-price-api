import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id); // primero hacemos fetch, actualizamos el usuario para depues actualizarlo
    if (!user) {
      throw new Error('User not found');
      Object.assign(user, attrs);
    }
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id); // primero hacemos fetch, actualizamos el usuario para depues actualizarlo
    return this.repo.remove(user);
  }
}
