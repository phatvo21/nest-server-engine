/** Load the test environment */

process.env.NODE_ENV='testing';
process.env.PORT='4000';
process.env.HOST='localhost';
process.env.DB_TYPE='postgres';
process.env.DB_USER='root';
process.env.DB_PASSWORD='root';
process.env.DB_NAME='test';
process.env.DB_HOST='127.0.0.1';
process.env.DB_PORT='5432';

console.log("LOAD??");

jest.setTimeout(60_000);
