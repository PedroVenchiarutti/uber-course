import { jestE2E } from './jest-e2e.config'

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true,
    carPlate: ""
	};
  
	const output = await jestE2E.post("/api/signup").send(input);

  expect(output.status).toBe(200);
});

test("Deve criar uma conta para o motorista", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: false,
    carPlate: "ABC123"
  };
  const output = await jestE2E.post("/api/signup").send(input);

  expect(output.status).toBe(200);
});

test("Deve retornar um array de usuários", async function () {
  const output = await jestE2E.get("/api/users");

  expect(output.status).toBe(200);
  expect(output.body).toBeInstanceOf(Array);
})