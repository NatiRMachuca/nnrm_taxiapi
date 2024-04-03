const app =require('../src/app');
const request=require('supertest');
const Pasajeros=require('../src/model');
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

describe('get pasajeros',()=>{
    test("la prueba debe responder con el status code 200",async () =>{
        Pasajeros.find.mockResolvedValueOnce([{
                _id:crypto.randomUUID(),
                nombre: "Pasajero ",
                apellidos: "Prueba Uno",
                sexo: "F",
                celular: 5519780322,
                correo: "test3@gmail.com"
        }])
        const response=await api.get("/pasajeros").send()
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(1)
    })

   

    test("que retorne una lista vacia",async () =>{
        Pasajeros.find.mockResolvedValueOnce([])
        const response=await api.get("/pasajeros").send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain("application\/json")
        expect(response.body.length).toBe(0)
    })

})

describe('post pasajeros',()=>{
     it("valida exito alta de conductor",async () =>{
        let data = {
            nombre: "Pasajero 1",
            apellidos: "x y",
            sexo: "M",
            celular: 5519780322,
            correo: "test3@gmail.com"
          }

        let nuevoPasajero={
            _id:crypto.randomUUID(),
            data
        }
        Pasajeros.create.mockResolvedValueOnce(nuevoPasajero)
        const response = await api.post("/pasajeros").send(data);
        expect(response.body).toStrictEqual(nuevoPasajero);
    })

    test("valida error al dar de alta un conductor al mandar post sin data regresa un 422",async () =>{
        const data = {};
        await api.post("/pasajeros").send(data).expect(422);
    })

})

