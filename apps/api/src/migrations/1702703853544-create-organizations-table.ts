import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateOrganizationsTable1702703853544
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organizations',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar(255)',
            isNullable: false
          }),
          new TableColumn({
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false
          }),
          new TableColumn({
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP()',
            isNullable: false
          })
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organizations')
  }
}
