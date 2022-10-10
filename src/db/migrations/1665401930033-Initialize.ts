import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1665401930033 implements MigrationInterface {
    name = 'Initialize1665401930033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`src\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`src\``);
    }

}
