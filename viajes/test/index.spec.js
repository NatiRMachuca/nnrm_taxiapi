const app =require('../src/app');
//const server =require('../src/index');
const request=require('supertest');
const Viajes=require('../src/model');
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
describe('get /viajes',()=>{
    test("la prueba debe responder con el status code 200",async () =>{
        Viajes.find.mockResolvedValueOnce([{
                _id:crypto.randomUUID(),
                pasajero: "65f52cd0d5c1463439c9729a",
                conductor: "65f5470fa52dda852ddbac51",
                direccion: "Loma linda"
            
        }])
        const response=await api.get("/viajes").send()
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(1)
    })
    test("que retorne una lista vacia",async () =>{
        Viajes.find.mockResolvedValueOnce([])
        const response=await api.get("/viajes").send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(0)
    })
    test("Que retorne mas de un viaje",async () =>{
        Viajes.find.mockResolvedValueOnce([{
                _id:crypto.randomUUID(),
                pasajero: "65f52cd0d5c1463439c9729a",
                conductor: "65f5470fa52dda852ddbac51",
                puntoinicio: {
                    latitud: 19.290192,
                    longitud: -99.224134
                },
                puntofinal: {
                    latitud: 19.304111101630596,
                    longitud: -99.19022479532426
                },
                comentarios:"prueba"
            
        },
        {
                _id:crypto.randomUUID(),
                pasajero: "65f52cd0d5c1463439c9729a",
                conductor: "65f5470fa52dda852ddbac51",
                puntoinicio: {
                    latitud: 19.290192,
                    longitud: -99.224134
                },
                puntofinal: {
                    latitud: 19.304111101630596,
                    longitud: -99.19022479532426
                },
                comentarios:"prueba"
            
        }])
        const response=await api.get("/viajes").send()
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(2)
    })
})

describe('post all',()=>{
     it("valida exito creacion de viaje",async () =>{
        const data = {
            pasajero: "65f52cd0d5c1463439c9729a",
            conductor: "65f5470fa52dda852ddbac51",
            puntoinicio: {
                latitud: 19.290192,
                longitud: -99.224134
              },
              puntofinal: {
                latitud: 19.304111101630596,
                longitud: -99.19022479532426
              },
            comentarios:"prueba"
        };
        const newViaje={
            _id:crypto.randomUUID(),
            ...data
        }
        Viajes.create.mockResolvedValueOnce(newViaje)
        const response = await api.post("/viajes").send(data);
        expect(response.body).toStrictEqual(newViaje);
    })

    test("valida error creacion de viaje al mandar post sin data regresa un 422",async () =>{
        const data = {};
        const response=await api.post("/viajes").send(data).expect(422);
    })
})

