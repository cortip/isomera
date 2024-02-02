import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Add2faFieldUsersTable1706871247270 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'twoFASecret',
        type: 'varchar(255)',
        isNullable: true
      }),
      new TableColumn({
        name: 'isTwoFAEnabled',
        type: 'boolean',
        isNullable: true,
        default: true
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['twoFASecret', 'isTwoFAEnabled'])
  }
}
