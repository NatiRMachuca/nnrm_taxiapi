
# TaxI Api Natividad
El proyecto de taxi api contiene 3 microservicios que se exponen a traves de un balanceador y esta en el puerto 8080.
Tambien contiene un servicio principal que se expone en el balanceador por puerto 8081.

## Conductores
Microservicio CRUD para los datos de conductores (Hecho con Express.js y Mongodb)
## Pasajeros
Microservicio CRUD para los datos de pasajeros (Hecho con Express.js y Mongodb)
## Viajes
Microservicio CRUD para los datos de viajes (Hecho con Express.js y Mongodb)

## Taxi Api
Es un servicio adicional que expone la funcionalidad para crear y finalizar viajes, todo esto conectandose a los microservcios mencionados.
Esta realizado en NestJs.








## Deployment

Para iniciar el proyecto

```bash
  docker-compose up
```

Para detener el proyecto

```bash
  docker-compose down
```

## API Reference Microservicios Conductores

#### Obtener todos los conductores

```http
  GET /conductores
```

#### Obtener conductores con filtros de distancia

```http
  GET http://localhost:8080/conductores?latitud=19.299396832412516&longitud=-99.21256406508573
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `estatus` | `querystring` | Puede ser `Disponilbe` `Ocupado` |
| `latitud` | `querystring` | La latitud de un punto de ubicación |
| `longitud` | `querystring` | La longitud de un punto de ubicación  |
| `radio` | `querystring` | Es la distancia en metros `Default 3000 metros` **Solo si latitud y longitud presente** |

#### Obtener conductor por id

```http
  GET /conductores/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Dar de alta conductor
Recibe un objeto JSON

```http
  POST http://localhost:8080/conductores
```

```JSON

{
    "nombre": "Conductor",
    "apellidos": "Chedrahui ajusco",
    "sexo": "M",
    "celular": 5519780322,
    "correo": "test3@gmail.com",
    "latitud": 19.299396832412516,  
   "longitud": -99.21256406508573
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` |Nombre(s) del conductor |
| `apellidos` | `string` |Apellido(s) del conductor |
| `sexo` | `string` | Sexo de condcutor pueder ser `M` `F` |
| `celular` | `number` | El número de celular del conductor |
| `correo` | `string` | El correo del Conductor  |
| `latitud` | `decimal` | La latitud de la ubicación del conductor|
| `longitud` | `deciaml` |La longitud  de la ubicación del conductor |




