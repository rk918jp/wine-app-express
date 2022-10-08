import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1664983243918 implements MigrationInterface {
    name = 'Initialize1664983243918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`typeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Winery\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_653f1096c1bd56659cfa08cca25\` FOREIGN KEY (\`typeId\`) REFERENCES \`Wine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_653f1096c1bd56659cfa08cca25\``);
        await queryRunner.query(`ALTER TABLE \`Winery\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
