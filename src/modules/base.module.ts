import { HealthController } from '../controllers/health.controller';
import { BaseConfigModule } from './base-config.module';
import { BaseDatabaseModule } from './base-database.module';
import { BaseLoggerModule } from './base-logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BaseConfigModule, BaseLoggerModule, BaseDatabaseModule],
  controllers: [HealthController],
})
export class BaseModule {}
