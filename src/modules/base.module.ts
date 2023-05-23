import { HealthController } from '@app/engine/controllers';
import { BaseConfigModule } from '@app/engine/modules/base-config.module';
import { BaseLoggerModule } from '@app/engine/modules/base-logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BaseConfigModule, BaseLoggerModule],
  controllers: [HealthController],
})
export class BaseModule {}
