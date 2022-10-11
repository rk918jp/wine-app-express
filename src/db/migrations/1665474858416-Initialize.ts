import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1665474858416 implements MigrationInterface {
    name = 'Initialize1665474858416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Winery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wine_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Wine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`wineryId\` int NULL, \`imageId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`src\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wine_wine_types_wine_type\` (\`wineId\` int NOT NULL, \`wineTypeId\` int NOT NULL, INDEX \`IDX_9a36f1c77a152f2f62f5e71fe1\` (\`wineId\`), INDEX \`IDX_47d9fdbc3fe7e5b696260c869a\` (\`wineTypeId\`), PRIMARY KEY (\`wineId\`, \`wineTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD CONSTRAINT \`FK_d9dfa4b7a432822c0744c5936a0\` FOREIGN KEY (\`wineryId\`) REFERENCES \`Winery\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Wine\` ADD CONSTRAINT \`FK_9a16d4bd4b72d835e610aefa2d9\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` ADD CONSTRAINT \`FK_9a36f1c77a152f2f62f5e71fe1a\` FOREIGN KEY (\`wineId\`) REFERENCES \`Wine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` ADD CONSTRAINT \`FK_47d9fdbc3fe7e5b696260c869a9\` FOREIGN KEY (\`wineTypeId\`) REFERENCES \`wine_type\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` DROP FOREIGN KEY \`FK_47d9fdbc3fe7e5b696260c869a9\``);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` DROP FOREIGN KEY \`FK_9a36f1c77a152f2f62f5e71fe1a\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP FOREIGN KEY \`FK_9a16d4bd4b72d835e610aefa2d9\``);
        await queryRunner.query(`ALTER TABLE \`Wine\` DROP FOREIGN KEY \`FK_d9dfa4b7a432822c0744c5936a0\``);
        await queryRunner.query(`DROP INDEX \`IDX_47d9fdbc3fe7e5b696260c869a\` ON \`wine_wine_types_wine_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a36f1c77a152f2f62f5e71fe1\` ON \`wine_wine_types_wine_type\``);
        await queryRunner.query(`DROP TABLE \`wine_wine_types_wine_type\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`Wine\``);
        await queryRunner.query(`DROP TABLE \`wine_type\``);
        await queryRunner.query(`DROP TABLE \`Winery\``);
    }

}
