const request = require('supertest');
const app = require('../app');
const Pessoa = require('../models/Pessoa')

describe('Testes da rota /listar', () => {
  it('Deve retornar status 200 e listar os registros paginados', async () => {
    const response = await request(app)
      .get('/listar')
      .expect(200);
    expect(response.body).toHaveProperty('registros');
    expect(response.body).toHaveProperty('numerodepaginas');
    expect(response.body).toHaveProperty('totalregistros');
  });

  it("Deve retornar a primeira página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=1&limitePorPagina=20"),
      numeroDePaginas = Math.ceil(totalregistros / registros.length),
      totalRegistros = await Pessoa.count();

    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(20);
    expect(response.body.numerodepaginas).toBe(numeroDePaginas);
    expect(response.body.totalregistros).toBe(totalRegistros);
  });

  it("Deve retornar a segunda página com 20 registros", async () => {
    const response = await request(app).get("/listar?pagina=2&limitePorPagina=20"),
      numeroDePaginas = Math.ceil(totalregistros / registros.length),
      totalRegistros = await Pessoa.count();


    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(20);
    expect(response.body.numerodepaginas).toBe(numeroDePaginas);
    expect(response.body.totalregistros).toBe(totalRegistros);
  });

  it("Deve retornar a última página com 10 registros", async () => {
    const response = await request(app).get("/listar?pagina=5&limitePorPagina=20"),
      numeroDePaginas = Math.ceil(totalregistros / registros.length),
      totalRegistros = await Pessoa.count();


    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(10);
    expect(response.body.numerodepaginas).toBe(numeroDePaginas);
    expect(response.body.totalregistros).toBe(totalRegistros);
  });

  it("Deve retornar a primeira página com 10 registros quando o limitePorPagina for 10", async () => {
    const response = await request(app).get("/listar?pagina=1&limitePorPagina=10"),
      numeroDePaginas = Math.ceil(totalregistros / registros.length),
      totalRegistros = await Pessoa.count();

    expect(response.status).toBe(200);
    expect(response.body.registros.length).toBe(10);
    expect(response.body.numerodepaginas).toBe(numeroDePaginas);
    expect(response.body.totalregistros).toBe(totalRegistros);
  });
});
