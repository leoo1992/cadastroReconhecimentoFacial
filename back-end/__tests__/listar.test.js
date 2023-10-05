const request = require('supertest');
const app = require('../app');

describe('Testes da rota /listar', () => {
  it('Deve retornar status 200 e lista de registros paginados', async () => {
    const response = await request(app)
      .get('/listar')
      .expect(200);
    expect(response.body).toHaveProperty('registros');
    expect(response.body).toHaveProperty('numerodepaginas');
    expect(response.body).toHaveProperty('totalregistros');
  });

  it("Deve retornar a primeira página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=1&limitePorPagina=20");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(20);
    expect(response.body.numerodepaginas).toBe(5);
    expect(response.body.totalregistros).toBe(90);
  });

  it("Deve retornar a segunda página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=2&limitePorPagina=20");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(20);
    expect(response.body.numerodepaginas).toBe(5);
    expect(response.body.totalregistros).toBe(90);
  });

  it("Deve retornar a última página com 10 registros", async () => {
    const response = await request(app).get("/listar?pagina=5&limitePorPagina=20");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(10);
    expect(response.body.numerodepaginas).toBe(5);
    expect(response.body.totalregistros).toBe(90);
  });

  it("Deve retornar a primeira página com 10 registros quando o limitePorPagina for 10", async () => {
    const response = await request(app).get("/listar?pagina=1&limitePorPagina=10");
    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(10);
    expect(response.body.numerodepaginas).toBe(9);
    expect(response.body.totalregistros).toBe(90);
  });
});
