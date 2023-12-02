import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPassResetCodeToUser1701547576586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'passwordResetCode',
        type: 'VARCHAR(32)',
        isNullable: true,
        default: null
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'passwordResetCode')
  }
}
