const supertest = require("supertest");

const app = require("../../server");

const api = supertest(app);

const { db } = require("../db/index");

describe("Provider-testing-routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it("POST /api/provider/provider", async () => {
    await api
      .post("/api/provider/provider")
      .send({
        nombreLargo: "provider1",
        nombreCorto: "provider1",
        observaciones: "observaciones1",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.provider.nombreLargo).toBe("provider1");
        expect(res.body.provider.nombreCorto).toBe("provider1");
        expect(res.body.provider.observaciones).toBe("observaciones1");
      });
  });

  it("GET /api/provider/providers", async () => {
    await api
      .get("/api/provider/providers")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body[0].id).toBe(1);
      });
  });

  it("GET /api/provider/providers/:id", async () => {
    await api
      .get("/api/provider/providers/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.id).toBe(1);
      });
  });

  it("PUT /api/provider/provider/1", async () => {
    await api
      .put("/api/provider/provider/1")
      .send({
        nombreLargo: "providerPut",
        nombreCorto: "providerPut",
        observaciones: "observacionesPut",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.nombreLargo).toBe("providerPut");
      });
  });

  it("DELETE /api/provider/providers/:id", async () => {
    await api
      .delete("/api/provider/providers/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.message).toBe("Provider deleted");
      });
  });
});
