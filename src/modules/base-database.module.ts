import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export type DBType = 'postgres' | 'mysql';

console.log(process.env.DB_NAME);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('app.databaseHost'),
        port: configService.get('app.databasePort'),
        username: configService.get('app.databaseUser'),
        password: configService.get('app.databasePassword'),
        database:  configService.get('app.databaseName'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BaseDatabaseModule {}
