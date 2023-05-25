import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

const entityPath: string = path.join(__dirname, 'src/db/entities/*.entity.js');
const migrationPath: string = path.join(__dirname, 'src/db/migrations/*.js');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('app.databaseType'),
        host: configService.get('app.databaseHost'),
        port: configService.get('app.databasePort'),
        username: configService.get('app.databaseUser'),
        password: configService.get('app.databasePassword'),
        database: configService.get('app.databaseName'),
        entities: [entityPath],
        migrations: [migrationPath],
        synchronize: false,
        autoLoadEntities: true,
        cli: {
          entitiesDir: `src/db/entities`,
          migrationsDir: `src/db/migrations`,
        },
      }),
      inject: [ConfigService],
    } as any),
  ],
})
export class BaseDatabaseModule {}
