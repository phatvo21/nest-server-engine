import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        timeout: 9000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class HttpServiceModule {}
