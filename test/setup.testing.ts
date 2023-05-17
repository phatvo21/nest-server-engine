/** Load the test environment */

// eslint-disable-next-line import/no-extraneous-dependencies
import * as env from 'dotenv';
import * as process from 'process';

env.config();

process.env.NODE_ENV = process.env.NODE_ENV ?? 'testing';
process.env.PORT = process.env.PORT ?? '4000';
process.env.HOST = process.env.HOST ?? 'localhost';
process.env.DB_TYPE = process.env.DB_TYPE ?? 'postgres';
process.env.DB_USER = process.env.DB_USER ?? 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD ?? 'root';
process.env.DB_NAME = process.env.DB_NAME ?? 'engine';
process.env.DB_HOST = process.env.DB_HOST ?? '127.0.0.1';
process.env.DB_PORT = process.env.DB_PORT ?? '5432';

jest.setTimeout(60_000);
