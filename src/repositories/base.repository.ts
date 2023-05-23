import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { BaseRepositoryInterface } from './base-repository.interface';

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public create(data: T | any): Promise<T> {
    return this.entity.save(data);
  }

  public findOneById(id: string): Promise<T> {
    return this.entity.findOneBy({ id } as FindOptionsWhere<any>);
  }

  public findByCondition(filterCondition: any): Promise<T> {
    return this.entity.findOne({ where: filterCondition });
  }

  public findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(relations);
  }

  public findAll(): Promise<T[]> {
    return this.entity.find();
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.entity.delete(id);
  }
}
