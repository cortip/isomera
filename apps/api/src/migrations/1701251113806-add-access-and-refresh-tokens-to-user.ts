import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAccessAndRefreshTokensToUser1701251113806
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'accessToken',
        type: 'varchar(255)',
        isNullable: true
      }),
      new TableColumn({
        name: 'refreshToken',
        type: 'varchar(255)',
        isNullable: true
      }),
      new TableColumn({
        name: 'active',
        type: 'BOOLEAN',
        default: false
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['accessToken', 'refreshToken'])
  }
}
