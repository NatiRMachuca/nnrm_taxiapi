const app =require('../src/app');
const request=require('supertest');
const Conductores=require('../src/model');
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

describe('get /conductores',()=>{
    test("la prueba debe responder con el status code 200",async () =>{
        Conductores.find.mockResolvedValueOnce([{
                _id:crypto.randomUUID(),
                ubicacion: {
                    type: "Point",
                    coordinates: [
                    -99.175410897977,
                    19.347604301755766
                    ]
                },
                nombre: "Conductor 3",
                apellidos: "oassis coyoacan",
                sexo: "M",
                celular: 5519780322,
                correo: "test3@gmail.com",
                estatus: "Ocupado"
        }])
        const response=await api.get("/conductores").send()
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(1)
    })

    test("que retorne conductores disponible",async () =>{
        Conductores.find.mockResolvedValueOnce([{
            _id:crypto.randomUUID(),
            ubicacion: {
                type: "Point",
                coordinates: [
                -99.175410897977,
                19.347604301755766
                ]
            },
            nombre: "Conductor 3",
            apellidos: "oassis coyoacan",
            sexo: "M",
            celular: 5519780322,
            correo: "test3@gmail.com",
            estatus: "Disponible"
        }])
        const response=await api.get("/conductores?estatus=Disponibles").send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(1)
    })

    test("que retorne una lista vacia",async () =>{
        Conductores.find.mockResolvedValueOnce([])
        const response=await api.get("/conductores").send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(0)
    })

})

describe('post conductores',()=>{
     it("valida exito alta de conductor",async () =>{
        let data = {
            nombre: "Conductor 4",
            apellidos: "oassis coyoacan",
            sexo: "M",
            celular: 5519780322,
            correo: "test3@gmail.com",
            latitud: 19.347604301755766,  
            longitud: -99.175410897977
          }

        let nuevoConductor={
            _id:crypto.randomUUID(),
            nombre: "Conductor 4",
            apellidos: "oassis coyoacan",
            sexo: "M",
            celular: 5519780322,
            correo: "test3@gmail.com",
            ubicacion: {
                type: "Point",
                coordinates: [
                  -99.175410897977,
                  19.347604301755766
                ]
            },
            estatus: "Disponible"
        }
       

        Conductores.create.mockResolvedValueOnce(nuevoConductor)
        const response = await api.post("/conductores").send(data);
        expect(response.body).toStrictEqual(nuevoConductor);
    })

    test("valida error al dar de alta un conductor al mandar post sin data regresa un 422",async () =>{
        const data = {};
        await api.post("/conductores").send(data).expect(422);
    })

})

