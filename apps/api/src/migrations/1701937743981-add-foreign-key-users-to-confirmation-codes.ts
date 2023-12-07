import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddForeignKeyUsersToConfirmationCodes1701937743981
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'confirmation-codes',
      new TableForeignKey({
        name: 'FK_users_of_confirmation_codes',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('confirmation-codes')
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1
    )
    await queryRunner.dropForeignKey('confirmation-codes', foreignKey)
  }
}
