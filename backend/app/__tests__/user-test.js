const supertest = require("supertest");

const app = require("../../server");

const api = supertest(app);

const { db } = require("../db/index");

describe("Users-testing-routes", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    it("POST /api/users/users", async () => {
        await api.post("/api/users/users")
        .send({
            mail: "mail1",
            contraseña: "contraseña1",
            nombre: "nombre1",
            apellido: "apellido1",
            telefono: "123",
            rol: "rol1",
            estado: "estado1",
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.mail).toBe("mail1");
            expect(res.body.nombre).toBe("nombre1");
            expect(res.body.apellido).toBe("apellido1");
            expect(res.body.telefono).toBe("123");
        });

    })

    it("GET /api/users/users", async () => {
        await api.get("/api/users/users")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body[0].id).toBe(1)

    });
    });

    it("GET /api/users/users/:id", async () => {
        await api.get("/api/users/users/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.id).toBe(1)
        });
    });

    it("PUT /api/users/users/:id", async () => {
        await api.put("/api/users/users/1")
        .send({
            mail: "mailPut",
            contraseña: "contraseñaPut",
            nombre: "nombrePut",
            apellido: "apellidoPut",
            telefono: "123",
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect((res) => {
            expect(res.body.mail).toBe("mailPut");
            expect(res.body.nombre).toBe("nombrePut");
            expect(res.body.apellido).toBe("apellidoPut");
            expect(res.body.telefono).toBe("123");
        });
    });

})