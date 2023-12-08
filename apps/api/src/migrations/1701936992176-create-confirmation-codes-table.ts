import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateConfirmationCodesTable1701936992176
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'confirmation-codes',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }),
          new TableColumn({
            name: 'code',
            type: 'VARCHAR(7)',
            isNullable: true,
            default: null
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false
          }),
          new TableColumn({
            name: 'expiresIn',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false
          }),
          new TableColumn({
            name: 'userId',
            type: 'int'
          })
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('confirmation-codes')
  }
}
