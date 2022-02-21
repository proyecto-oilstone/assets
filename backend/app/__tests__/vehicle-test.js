


const supertest = require("supertest");

const app = require("../../server");


const api = supertest(app);

const { db, Provider, CarType } = require("../db/index");





describe("test-home", () => {
    it('should access the home endpoint', async () => {
        await api.get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        
    })
})


describe("testing-vehicle-routes", () => {
    
    beforeAll(async () => {
       await db.sequelize.sync({force: true});
       await Provider.create({
            nombreLargo: "provider1",
            nombreCorto: "provider1",
            observaciones: "observaciones1",
       })
         await CarType.create({
            nombreLargo: "carType1",
            nombreCorto: "carType1",
            observaciones: "observaciones1",
         })

    })
    it("POST /api/cars/autos ", async () => {
        await api.post('/api/cars/nuevoAuto')
        .send({
            patente: "AAAA123",
            año: 2013,
            ProviderId: 1,
            CarTypeId: 1,

        })
        .expect(200)
        .expect('Content-Type', /json/)

})
    it("GET /api/cars/autos", async () => {
        await api.get('/api/cars/autos')
        .expect(200)
        .expect('Content-Type', /json/)

        
    })

    it("GET /api/cars/autos/:id", async () => {
    await api.get('/api/cars/autos/1')
    .expect(200)
    .expect('Content-Type', /json/)
    
})
    it("PUT /api/cars/editAuto/:id", async () => {
    await api.put('/api/cars/editAuto/1')
    .send({
        patente: "ABDASD231",
        año: 1999,
        ProviderId: 1,
        CarTypeId: 1,

    })
    .expect(200)
    .expect('Content-Type', /json/)
})
    it("DELETE /api/cars/autos/:id", async () => {
        await api.delete('/api/cars/autos/1')
        .expect(200)
        .expect('Content-Type', /json/)

    })

})
