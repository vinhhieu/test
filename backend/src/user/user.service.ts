import { Injectable } from '@nestjs/common'
import { User } from 'entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateResult, DeleteResult } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne()
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }
}
