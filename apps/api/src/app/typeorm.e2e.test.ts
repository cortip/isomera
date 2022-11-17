import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { Connection, DataSource, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ConfirmCode } from '../user/entities/confirm-code.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from 'ts-auto-mock';

let app;
let connection;

describe('Auth testing', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get(Connection);
    await connection.synchronize(true);
  });

  test('It should generate Connection object', async () => {
    expect(connection).toBeInstanceOf(DataSource);
  });

  test('It should create the user', async () => {
    const result = await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'John Doe',
          email: 'JohnDoe@email.com',
          password: '12345678',
        },
      ])
      .execute();

    expect(result).not.toBeNull();
  });

  afterAll(async () => {
    await app?.close();
  });
});
