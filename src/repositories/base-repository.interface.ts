import { DeleteResult, FindManyOptions } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: string): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
}
