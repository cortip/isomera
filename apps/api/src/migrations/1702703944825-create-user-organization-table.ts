import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateUserOrganizationTable1702703944825
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user-organization',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }),
          new TableColumn({
            name: 'userId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'organizationId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'role',
            type: 'int',
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
    await queryRunner.dropTable('user-organization')
  }
}
