const request = require('supertest'),
  app = require('../app');

describe("Testes de Paginação na Rota /listar", () => {
  it("Deve retornar a primeira página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=1&limitePorPagina=20");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(18);
    expect(response.body.numerodepaginas).toBe(1);
    expect(response.body.totalregistros).toBe(18);
  });

  it("Deve retornar a segunda página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=2&limitePorPagina=20");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(0);
    expect(response.body.numerodepaginas).toBe(1);
    expect(response.body.totalregistros).toBe(18);
  });
});
