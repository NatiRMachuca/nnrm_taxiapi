import { Controller,Get,Post,Put, Body, Param,NotFoundException } from '@nestjs/common';
import {ViajesService} from './viajes.service';
import { CrearViajeDto } from 'src/dto/create-viaje.dto';
import { ModificarViajeDto } from 'src/dto/update-viaje.dto';


@Controller('viajes')
export class ViajesController {

    constructor(private viajesService: ViajesService){}

    @Post()
    async create(@Body() body:CrearViajeDto){
        try {
            return await this.viajesService.crearViaje(body);
        } catch (error) {
            throw error;
            
        }
    }

    @Put(':id')
    update(@Param('id') id: string){
        const viaje=this.viajesService.completarViaje(id)
        if(!viaje) throw new NotFoundException('Viaje no encontrado');
        return viaje;
    }
}
