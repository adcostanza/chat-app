export const ENV = {
  PGUSER: process.env.PGUSER || 'postgres',
  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || 'password',
  PGHOST: process.env.PGHOST || 'localhost',
  PGPORT: process.env.PGPORT || '5432',
};
