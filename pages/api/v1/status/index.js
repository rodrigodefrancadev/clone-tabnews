import database from "/infra/database";

async function status(request, response) {
  const selectDbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = selectDbVersionResult.rows[0].server_version;

  const result = await database.query(
    "SELECT current_setting('max_connections') as max_connections, (select count(*) from pg_stat_activity) as opened_connections",
  );

  const dbMaxConnections = parseInt(result.rows[0].max_connections);
  const dbOpenedConnections = parseInt(result.rows[0].opened_connections);

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
