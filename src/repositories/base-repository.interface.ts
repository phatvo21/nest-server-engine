import { DeleteResult, FindManyOptions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryInterface<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: string): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;

  update(id: string, data: T | any): Promise<UpdateResult>;

  upsert(data: QueryDeepPartialEntity<T>[]): Promise<InsertResult>;
}
