import { MigrationInterface, QueryRunner } from "typeorm";

export class entity1668102060079 implements MigrationInterface {
    name = 'entity1668102060079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "confirm_code" ("id" SERIAL NOT NULL, "code" character varying(7) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresIn" TIME NOT NULL, "userId" integer, CONSTRAINT "PK_29e1e22d77645a18563a6b8742e" PRIMARY KEY ("id")); COMMENT ON COLUMN "confirm_code"."code" IS 'User code verification after registering'; COMMENT ON COLUMN "confirm_code"."expiresIn" IS 'Limit time to use this code'`);
        await queryRunner.query(`ALTER TABLE "confirm_code" ADD CONSTRAINT "FK_008eeb707e7d96e5e7e9a09b0b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm_code" DROP CONSTRAINT "FK_008eeb707e7d96e5e7e9a09b0b6"`);
        await queryRunner.query(`DROP TABLE "confirm_code"`);
    }

}
