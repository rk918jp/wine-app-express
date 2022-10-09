import { MigrationInterface, QueryRunner } from "typeorm";

export class Image1665289321398 implements MigrationInterface {
    name = 'Image1665289321398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_653f1096c1bd56659cfa08cca25\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`typeId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`typeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_653f1096c1bd56659cfa08cca25\` FOREIGN KEY (\`typeId\`) REFERENCES \`Wine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
