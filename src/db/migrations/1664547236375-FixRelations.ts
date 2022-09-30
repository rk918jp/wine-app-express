import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1664547236375 implements MigrationInterface {
    name = 'FixRelations1664547236375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wine_wine_types_wine_type\` (\`wineId\` int NOT NULL, \`wineTypeId\` int NOT NULL, INDEX \`IDX_9a36f1c77a152f2f62f5e71fe1\` (\`wineId\`), INDEX \`IDX_47d9fdbc3fe7e5b696260c869a\` (\`wineTypeId\`), PRIMARY KEY (\`wineId\`, \`wineTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` ADD CONSTRAINT \`FK_9a36f1c77a152f2f62f5e71fe1a\` FOREIGN KEY (\`wineId\`) REFERENCES \`Wine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` ADD CONSTRAINT \`FK_47d9fdbc3fe7e5b696260c869a9\` FOREIGN KEY (\`wineTypeId\`) REFERENCES \`wine_type\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` DROP FOREIGN KEY \`FK_47d9fdbc3fe7e5b696260c869a9\``);
        await queryRunner.query(`ALTER TABLE \`wine_wine_types_wine_type\` DROP FOREIGN KEY \`FK_9a36f1c77a152f2f62f5e71fe1a\``);
        await queryRunner.query(`DROP INDEX \`IDX_47d9fdbc3fe7e5b696260c869a\` ON \`wine_wine_types_wine_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a36f1c77a152f2f62f5e71fe1\` ON \`wine_wine_types_wine_type\``);
        await queryRunner.query(`DROP TABLE \`wine_wine_types_wine_type\``);
    }

}
