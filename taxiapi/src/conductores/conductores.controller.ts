import { Controller,Get } from '@nestjs/common';
import { ConductoresService } from './conductores.service';

@Controller('conductores')
export class ConductoresController {
    constructor(private conductoresService: ConductoresService){}

    @Get()
    findAll(){
        return this.conductoresService.getConductores();
    }
}
