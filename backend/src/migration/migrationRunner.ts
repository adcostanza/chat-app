import { QueryRunner } from 'typeorm';

export interface Migration {
  name: string;
  migration: (queryRunner: QueryRunner) => Promise<void>;
}
export const runMigrations = async (
  queryRunner: QueryRunner,
  ...migrations: Migration[]
) => {
  const migrationsExist = await migrationsTableExists(queryRunner);
  console.log(migrationsExist ? 't' : 'f');
  if (migrationsExist) {
    const completedMigrations = ((await queryRunner.query(
      `SELECT name from migrations`
    )) as { name: string }[]).map(migration => migration.name);

    for (let migration of migrations) {
      if (completedMigrations.find(o => o === migration.name)) {
        console.log(`Already completed migration '${migration.name}', continuing...`);
        continue;
      }
      console.log(completedMigrations);
      //do migration
      await migration.migration(queryRunner);
      await queryRunner.query(
        `INSERT INTO migrations (name) values ('${migration.name}')`
      );
    }
    console.log('Migrations complete');
  } else {
    //create migrations table
    await queryRunner.query(`CREATE TABLE migrations (
      id serial,
      name varchar (20)
    )`);

    await runMigrations(queryRunner, ...migrations);
  }
};

const migrationsTableExists = async (queryRunner: QueryRunner) => {
  const [{ migrations }] = await queryRunner.query(
    `SELECT to_regclass('migrations') as migrations`
  );
  return migrations === 'migrations';
};
