const supertest = require("supertest");

const app = require("../../server");

const api = supertest(app);

const { db } = require("../db/index");

describe("CarType-testing-routes", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it("POST /api/carType/carType", async () => {
    await api
      .post("/api/carType/carType")
      .send({
        nombreLargo: "carType1",
        nombreCorto: "carType1",
        observaciones: "observaciones1",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.carType.nombreLargo).toBe("carType1");
        expect(res.body.carType.nombreCorto).toBe("carType1");
        expect(res.body.carType.observaciones).toBe("observaciones1");
      });
  });

  it("GET /api/carType/carTypes", async () => {
    await api
      .get("/api/carType/carTypes")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body[0].id).toBe(1);
      });
  });

  it("GET /api/carType/carTypes/:id", async () => {
    await api
      .get("/api/carType/carTypes/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.id).toBe(1);
      });
  });

  it("PUT /api/carType/carType/:id", async () => {
    await api
      .put("/api/carType/carType/1")
      .send({
        nombreLargo: "carTypePut",
        nombreCorto: "carTypePut",
        observaciones: "observacionesPut",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.nombreLargo).toBe("carTypePut");
      });
  });

  it("DELETE /api/carType/carType/:id", async () => {
    await api
      .delete("/api/carType/carTypes/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.message).toBe("CarType deleted");
      });
  });
});
