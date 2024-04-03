
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
  GET /conductores?latitud=19.299396832412516&longitud=-99.21256406508573
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
  POST /conductores
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
| `sexo` | `string` | Sexo de conductor pueder ser `M` `F` |
| `celular` | `number` | El número de celular del conductor |
| `correo` | `string` | El correo del conductor|
| `latitud` | `decimal` | La latitud de la ubicación del conductor|
| `longitud` | `deciaml` |La longitud  de la ubicación del conductor |


## API Reference Microservicios Pasajeros

#### Obtener todos los pasajeros
```http
  GET /pasajeros
```
#### Obtener pasajero por id
```http
  GET /pasajeros/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |

#### Dar de alta pasajero
Recibe un objeto JSON

```http
  POST /pasajeros
```

```JSON
    {
        "nombre": "Jared",
        "apellidos": "Mitchell",
        "sexo": "F",
        "celular": 3103135777,
        "correo": "richardhopkins@example.org"
    }
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` |Nombre(s) del pasajero |
| `apellidos` | `string` |Apellido(s) del pasajero |
| `sexo` | `string` | Sexo de pasajero pueder ser `M` `F` |
| `celular` | `number` | El número de celular del pasajero |
| `correo` | `string` | El correo del pasajero|

## API Reference Microservicios Viajes

#### Obtener todos los viajes activos

```http
  GET /viajes
```
#### Obtener viaje por id

```http
  GET /viajes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |

#### Dar de alta un viaje
Recibe un objeto JSON

```http
  POST /viajes
```

```JSON
{
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
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pasajero` | `string` |id de pasajero solicitando un viaje **Required**|
| `conductor` | `string` |id del conductor mas cercano **Required** |
| `puntoinicio` | `JSON` | Latitud y longitud de la ubicación punto de partida del viaje |
| `puntofinal` | `JSON` | Latitud y longitud de la ubicación punto de llegada |
| `comentarios` | `string` | comentarios|

#### Actualiza viaje por id

```http
  PUT /viajes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |

## API Reference TaxiApi

#### Iniciar viaje

Recibe un objeto JSON

```http
  POST http://localhost:8081/viajes
```

```JSON
{
    "pasajero": "65f52cd0d5c1463439c9729a",
    "puntoinicio": {
        "latitud": 19.290192,
        "longitud": -99.224134
        },
    "puntofinal": {
        "latitud": 19.304111101630596,
        "longitud": -99.19022479532426
        },
    "comentarios":"prueba"
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pasajero` | `string` |id de pasajero solicitando un viaje **Required**|
| `puntoinicio` | `JSON` | Latitud y longitud de la ubicación punto de partida del viaje |
| `puntofinal` | `JSON` | Latitud y longitud de la ubicación punto de llegada |
| `comentarios` | `string` | comentarios|

#### Completar viaje

```http
  PUT http://localhost:8081/viajes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |









