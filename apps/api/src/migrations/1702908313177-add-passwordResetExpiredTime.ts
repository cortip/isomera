import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPasswordResetExpiredTime1702908313177
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'passwordResetExpiredTime',
        type: 'timestamp',
        isNullable: true,
        default: null
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'passwordResetExpiredTime')
  }
}
