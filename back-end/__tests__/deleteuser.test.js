
const request = require("supertest"),
  app = require("../app");

describe("Testes para a rota de exclusão de usuário", () => {
  it("Deve retornar um status 404 ao tentar excluir um usuário que não existe", async () => {
    const idNaoExistente = 123,
      response = await request(app)
        .delete(`/deletaruser/${idNaoExistente}`)
        .send();

    expect(response.status).toBe(404);
  });
});
