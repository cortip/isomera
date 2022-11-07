import { MigrationInterface, QueryRunner } from 'typeorm';

export class entity1667853756823 implements MigrationInterface {
  name = 'entity1667853756823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "active" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
  }
}
