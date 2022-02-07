


const supertest = require("supertest");

const app = require("../../server");


const api = supertest(app);

const { db } = require("../db/index");





describe("test-home", () => {
    it('should access the home endpoint', async () => {
        await api.get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        
    })
})


describe("testing-vehicle-routes", () => {
    
    beforeAll(async () => {
       await db.sequelize.sync({alter: true});
    })
    it("GET /api/cars/autos", async () => {
        await api.get('/api/cars/autos')
        .expect(200)
        .expect('Content-Type', /json/)

        
    })
    it("POST /api/cars/autos ", async () => {
        await api.post('/api/cars/nuevoAuto')
        .send({
            patente: "AAAAA23111",
            año: 20013,
            ProviderId: 5,
            CarTypeId: 8,

        })
        .expect(200)
        .expect('Content-Type', /json/)

})

    it("GET /api/cars/autos/:id", async () => {
    await api.get('/api/cars/autos/20')
    .expect(200)
    .expect('Content-Type', /json/)
    
})
    it("PUT /api/cars/editAuto/:id", async () => {
    await api.put('/api/cars/editAuto/20')
    .send({
        patente: "ABDASD231",
        año: 1999,
        ProviderId: 5,
        CarTypeId: 8,

    })
    .expect(200)
    .expect('Content-Type', /json/)
})

})
