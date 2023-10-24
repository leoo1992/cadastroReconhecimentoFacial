const request = require("supertest"),
  app = require("../app");

describe("Testes para a rota de login", () => {

  it("Deve retornar um erro ao fazer login com credenciais inválidas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ usuario: "usuario_invalido", senha: "senha_invalida" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Credenciais inválidas.");
  });
});
