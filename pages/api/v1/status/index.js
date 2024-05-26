import database from "/infra/database";

async function status(request, response) {
  const result = await database.query("SELECT version() as version");
  console.log(result.rows);
  const dbVersion = result.rows[0].version.split(" ")[1];
  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion,
      },
    },
  });
}

export default status;
