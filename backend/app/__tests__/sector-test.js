const supertest = require("supertest");

const app = require("../../server");

const api = supertest(app);

const { db } = require("../db/index");

describe("Sector-testing-routes", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    it("POST /api/sector/sector", async () => {
        await api.post("/api/sector/sector")
        .send({
            nombreLargo: "nombreLargo1",
            nombreCorto: "nombreCorto1",
            observaciones: "observaciones1",
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.sector.nombreLargo).toBe("nombreLargo1");
            expect(res.body.sector.nombreCorto).toBe("nombreCorto1");
            expect(res.body.sector.observaciones).toBe("observaciones1");
        });

    })

    it("GET /api/sector/sector", async () => {
        await api.get("/api/sector/sector")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body[0].id).toBe(1)

    });
    });

    it("GET /api/sector/sector/:id", async () => {
        await api.get("/api/sector/sector/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.id).toBe(1)
        });
    });

    it("PUT /api/sector/sector/:id", async () => {
        await api.put("/api/sector/sector/1")
        .send({
            nombreLargo: "nombreLargoPut",
            nombreCorto: "nombreCortoPut",
            observaciones: "observacionesPut",
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.nombreLargo).toBe("nombreLargoPut");
            expect(res.body.nombreCorto).toBe("nombreCortoPut");
            expect(res.body.observaciones).toBe("observacionesPut");
        });
    });

    it("DELETE /api/sector/sector/:id", async () => {
        await api.delete("/api/sector/sector/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.message).toBe("Sector deleted");
        });

    });



});