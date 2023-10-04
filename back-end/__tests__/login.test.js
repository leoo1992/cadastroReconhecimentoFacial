const request = require("supertest");
const app = require("../app");

describe("Testes para a rota de login", () => {

  it("Deve fazer login com credenciais corretas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ usuario: "santos-contato@hotmail.gg", senha: "leo123" });

    console.log("Resposta do login:", response.body);
    expect(response.status).toBe(200);
  });

  it("Deve retornar um erro ao fazer login com credenciais inválidas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ usuario: "usuario_invalido", senha: "senha_invalida" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Credenciais inválidas.");
  });
});
