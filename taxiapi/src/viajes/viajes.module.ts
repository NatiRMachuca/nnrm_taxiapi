import { Module } from '@nestjs/common';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './viajes.service';

@Module({
    imports: [],
    controllers: [ViajesController],
    providers: [ViajesService]
})
export class ViajesModule {}
