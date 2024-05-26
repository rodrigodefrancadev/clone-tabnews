import database from "/infra/database";

async function status(request, response) {
  const result = await database.query(
    "SELECT version() as version, current_setting('max_connections') as max_connections, (select count(*) from pg_stat_activity) as opened_connections",
  );

  const dbVersion = result.rows[0].version.split(" ")[1];
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
