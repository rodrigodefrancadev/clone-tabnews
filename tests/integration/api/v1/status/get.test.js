test("Get api/v1/status and return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const body = await response.json();

  const parsedDate = new Date(body.updated_at);
  expect(body.updated_at).toBe(parsedDate.toISOString());

  expect(body.dependencies.database.version).toEqual("16.0");
  expect(body.dependencies.database.max_connections).toEqual(100);
  expect(body.dependencies.database.opened_connections).toBeDefined();
});
