const request = require("supertest"),
  app = require("../app");

describe("Testes para a rota de cadastro usuario", () => {

  it("Deve retornar um 200 ao fazer cadastro", async () => {
    const response = await request(app)
      .post("/cadastrousuarios")
      .send({ usuario: "abc@abc.abc", senha: "abc123456" });

    expect(response.status).toBe(200);
  });
});