test("Get api/v1/status and return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const body = await response.json();

  expect(body.updated_at).toBeDefined();

  const parsedDate = new Date(body.updated_at);
  expect(body.updated_at).toBe(parsedDate.toISOString());
});
