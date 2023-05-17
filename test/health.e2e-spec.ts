import { generateMockServer, generateRequest, RequestType, ServerType } from '@app/engine/utils/database-test.util';

import { BaseModule } from '../src/modules';

describe('HealthController (e2e)', () => {
  let server: ServerType;
  let request: RequestType;

  beforeAll(async () => {
    server = await generateMockServer([BaseModule]);
    request = generateRequest(server);
  });

  afterAll(async () => {
    await server.app.close();
  });

  it('/ (GET)', async () => {
    const result = await request.agent.get('/health');
    expect(result.body.status).toEqual('OK');
    expect(result.status).toEqual(200);
  });
});
