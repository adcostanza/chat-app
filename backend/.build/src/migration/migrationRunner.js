"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = async (queryRunner, ...migrations) => {
    const migrationsExist = await migrationsTableExists(queryRunner);
    if (migrationsExist) {
        const completedMigrations = (await queryRunner.query(`SELECT name from migrations`)).map(migration => migration.name);
        for (let migration of migrations) {
            if (completedMigrations.find(o => o === migration.name)) {
                console.log(`Already completed migration '${migration.name}', continuing...`);
                continue;
            }
            console.log(completedMigrations);
            //do migration
            await migration.migration(queryRunner);
            await queryRunner.query(`INSERT INTO migrations (name) values ('${migration.name}')`);
        }
        console.log('Migrations complete');
    }
    else {
        //create migrations table
        await queryRunner.query(`CREATE TABLE migrations (
      id serial,
      name varchar (20)
    )`);
        await exports.runMigrations(queryRunner, ...migrations);
    }
};
const migrationsTableExists = async (queryRunner) => {
    const [{ migrations }] = await queryRunner.query(`SELECT to_regclass('migrations') as migrations`);
    return migrations === 'migrations';
};
