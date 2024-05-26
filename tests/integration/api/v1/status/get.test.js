test("Get api/v1/status and return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const body = await response.json();
  console.log(body);
  expect(body.updated_at).toBeDefined();

  const parsedDate = new Date(body.updated_at);
  expect(body.updated_at).toBe(parsedDate.toISOString());

  expect(body.dependencies?.database).toBeDefined();
  expect(body.dependencies.database.version).toBeDefined();
  expect(body.dependencies.database.max_connections).toBeDefined();
});
