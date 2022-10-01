import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnTypes1664546872213 implements MigrationInterface {
    name = 'FixColumnTypes1664546872213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`winery\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`wineType\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`wineryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Winery\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Winery\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`wine_type\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`wine_type\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD CONSTRAINT \`FK_d9dfa4b7a432822c0744c5936a0\` FOREIGN KEY (\`wineryId\`) REFERENCES \`Winery\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP FOREIGN KEY \`FK_d9dfa4b7a432822c0744c5936a0\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wine_type\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`wine_type\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Winery\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Winery\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP COLUMN \`wineryId\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`wineType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD \`winery\` varchar(255) NOT NULL`);
    }

}
