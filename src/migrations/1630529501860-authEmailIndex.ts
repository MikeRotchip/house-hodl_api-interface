import { MigrationInterface, QueryRunner } from 'typeorm';

export class authEmailIndex1630529501860 implements MigrationInterface {
  name = 'authEmailIndex1630529501860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."auth" ADD CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b54f616411ef3824f6a5c06ea4" ON "public"."auth" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b54f616411ef3824f6a5c06ea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."auth" DROP CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46"`,
    );
  }
}
