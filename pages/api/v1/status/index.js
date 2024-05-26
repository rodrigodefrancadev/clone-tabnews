import database from "/infra/database";

async function status(request, response) {
  const showDbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = showDbVersionResult.rows[0].server_version;

  const showDbMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const dbMaxConnections = parseInt(
    showDbMaxConnectionsResult.rows[0].max_connections,
  );

  const dbOpenedConnectionsResult = await database.query(
    "SELECT count(*)::int from pg_stat_activity where datname = 'postgres'",
  );
  console.log(dbOpenedConnectionsResult.rows);
  const dbOpenedConnections = dbOpenedConnectionsResult.rows[0].count;

  const updatedAt = new Date().toISOString();

  const responseBody = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: dbMaxConnections,
        opened_connections: dbOpenedConnections,
      },
    },
  };

  response.status(200).json(responseBody);
}

export default status;
