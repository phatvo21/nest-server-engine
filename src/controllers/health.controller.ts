import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  @Get()
  public async healthCheck(): Promise<{ status: string }> {
    return {
      status: 'OK',
    };
  }
}
