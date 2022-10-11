import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1665474903828 implements MigrationInterface {
    name = 'Initialize1665474903828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`oneWord\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`country\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`breed\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`link\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`breed\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`oneWord\``);
    }

}
