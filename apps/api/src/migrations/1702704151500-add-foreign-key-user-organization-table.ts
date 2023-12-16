import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddForeignKeyUserOrganizationTable1702704151500
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'user-organization',
      new TableForeignKey({
        name: 'FK_users_of_user-organization',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'user-organization',
      new TableForeignKey({
        name: 'FK_organizations_of_user-organization',
        columnNames: ['organizationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organizations',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user-organization')
    const foreignKeyUser = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1
    )
    await queryRunner.dropForeignKey('user_organization', foreignKeyUser)

    const foreignKeyOrganization = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('organizationId') !== -1
    )
    await queryRunner.dropForeignKey(
      'user_organization',
      foreignKeyOrganization
    )
  }
}
