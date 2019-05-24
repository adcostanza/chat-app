import { postgres } from "../db/postgres";
import { Store } from "../db/store";
import { authenticateAndGetClaims } from "../utils/claims";
import { createHandler } from "../utils/lambda";

const dropTablesLogic = async () => {
  await postgres.connect();
  const queryRunner = await postgres.getQueryRunner();
  await Store.dropTables(queryRunner);
  return {
    statusCode: 200,
    body: JSON.stringify({
      complete: true
    })
  };
};

const operations = [authenticateAndGetClaims, dropTablesLogic];

const dropTables = createHandler({ operations });

export { dropTables };
