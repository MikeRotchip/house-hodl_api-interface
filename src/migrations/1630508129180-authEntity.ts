import { MigrationInterface, QueryRunner } from 'typeorm';

export class authEntity1630508129180 implements MigrationInterface {
  name = 'authEntity1630508129180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" integer NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
