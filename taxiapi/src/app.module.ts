import { Module } from '@nestjs/common';
import { ViajesModule } from './viajes/viajes.module';
import { ConductoresModule } from './conductores/conductores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),ViajesModule, ConductoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
