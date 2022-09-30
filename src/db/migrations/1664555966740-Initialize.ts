import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1664555966740 implements MigrationInterface {
    name = 'Initialize1664555966740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wine_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Wine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`winery\` varchar(255) NOT NULL DEFAULT 'Winery', \`wineType\` varchar(255) NOT NULL DEFAULT 'WineType', \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Winery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Winery\``);
        await queryRunner.query(`DROP TABLE \`Wine\``);
        await queryRunner.query(`DROP TABLE \`wine_type\``);
    }

}
