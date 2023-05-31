import { DeleteResult, FindManyOptions, FindOptionsWhere, InsertResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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

  public update(id: string, data: any): Promise<UpdateResult> {
    return this.entity.update(id, data);
  }

  public upsert(data: QueryDeepPartialEntity<T>[]): Promise<InsertResult> {
    const conflicts = data.flatMap((value) => Object.keys(value));
    return this.entity.upsert(data, {
      conflictPaths: conflicts,
      skipUpdateIfNoValuesChanged: true,
      upsertType: 'on-conflict-do-update',
    });
  }
}
