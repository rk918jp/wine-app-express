import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1665243643387 implements MigrationInterface {
    name = 'Initialize1665243643387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`imageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD CONSTRAINT \`FK_9a16d4bd4b72d835e610aefa2d9\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP FOREIGN KEY \`FK_9a16d4bd4b72d835e610aefa2d9\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`imageId\``);
    }

}
