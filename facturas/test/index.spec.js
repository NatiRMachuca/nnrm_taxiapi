const app =require('../src/app');
const request=require('supertest');
const Facturas=require('../src/model');
const crypto = require('crypto');


const api=request(app)

jest.mock("mongoose",()=>({
    connect:()=>new Promise(()=>jest.fn(),()=>jest.fn())
}))


jest.mock("../src/bus",()=>({
    publish:()=>(console.log("Msj publicado al bus"))
}))

jest.mock("../src/model",()=>({
    find: jest.fn(),
    create: jest.fn()
}))

describe('get facturas',()=>{
    test("la prueba debe responder con el status code 200",async () =>{
        Facturas.find.mockResolvedValueOnce([{
                _id:crypto.randomUUID(),
                viaje: "660df885cf30bc29ef0068da",
                distancia: "2404.971071026569",
                precio: "19239.768568212552"
              }])
        const response=await api.get("/facturas").send()
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(1)
    })


    test("que retorne una lista vacia",async () =>{
        Facturas.find.mockResolvedValueOnce([])
        const response=await api.get("/facturas").send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(0)
    })


})

