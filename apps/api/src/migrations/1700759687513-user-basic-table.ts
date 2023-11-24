import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class UserBasicTable1700759687513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar(255)',
            isUnique: true
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar(255)',
            isNullable: true
          }),
          new TableColumn({
            name: 'firstName',
            type: 'varchar(255)',
            isNullable: true
          }),
          new TableColumn({
            name: 'lastName',
            type: 'varchar(255)',
            isNullable: true
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
    await queryRunner.dropTable('users')
  }
}
