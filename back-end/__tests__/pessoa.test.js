const request = require("supertest");
const app = require("../app");

describe("Testes para a rota de cadastro Pessoa", () => {

  it("Deve retornar um 200 ao fazer cadastro de pessoa", async () => {
    const response = await request(app)
      .post("/cadastro")
      .send({ nome: "leonardo", cpf: "489489499", tipo: "0", ativo: "0" });

    expect(response.status).toBe(200);
  });
});

