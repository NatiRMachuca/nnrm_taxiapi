import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import {CrearViajeDto} from '../dto/create-viaje.dto'

@Injectable()
export class ViajesService {

    async obtenerViajes() {
        const uri = process.env.HOST+"viajes/";
        console.log(process.env.url_conductores);
        try {
          const response = await axios.get(uri);
          return response.data;
        } catch (error) {
          console.error(error);
        }
    }

    async crearViaje(createViaje: CrearViajeDto){
      console.log(createViaje);
      //validar que exista registrado el pasajero
      const uripasajeros = process.env.HOST+"pasajeros/"+createViaje.pasajero;
      console.log(uripasajeros);
      let existePasajero=false;

      try {
        const response = await axios.get(uripasajeros);
        if(response.status === 200) {
            console.log(response.data);
            existePasajero=true;
        }
          
      } catch (error) {
        console.error("ocurrio un error al consultar pasajero");
        throw new NotFoundException('Pasajero no existe'); 
      }


      if(existePasajero){
        //buscar los conductores mas cercanos
        const {latitud,longitud} =createViaje.puntoinicio;
        const uriconductores=`${process.env.HOST}conductores?latitud=${latitud}&longitud=${longitud}&radio=3000`;
        console.log(uriconductores);
        let idconductor="";
        try {
          const response = await axios.get(uriconductores);
          if(response.status === 200){
            console.log(response.data.lenght);
            if(response.data[0]!=null) {
              idconductor=response.data[0]._id;
            }
            
          }
            
        } catch (error) {
          console.error("ocurrio un error al consultar conductores",error);
          
        }

        console.log("id conductor: ",idconductor);
        if(idconductor!="") {
          const uri = process.env.HOST+"viajes/";
          console.log(uri);

          try {
            const response = await axios.post(uri,{...createViaje,conductor: idconductor});
            return response.data;
          } catch (error) {
            console.error(error);
            throw new ForbiddenException('Error al crear viaje');
          }
        }else{
          throw new NotFoundException('No hay conductores disponibles'); 
        }

      }

    }

    async completarViaje(id: string){
      const uri = `${process.env.HOST}viajes/${id}`;
      console.log("servicio",uri);
      try {
        const response = await axios.put(uri);
        if(response.status === 200){
          return response.data;
        }else{
          throw new NotFoundException('No encontro viaje');
        }
      } catch (error) {
        //console.error(error);
        throw new NotFoundException('Ocurrio un error de viaje');
      }
    }

}
