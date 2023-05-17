import { BaseModule } from '@app/engine/modules';
import { bootstrap } from '@app/engine/utils';

bootstrap(BaseModule, { title: 'Server Engine API', server: '/ws-server-engine' });
