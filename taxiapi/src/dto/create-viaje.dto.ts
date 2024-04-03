import { Type } from "class-transformer";
import { IsInt, 
    IsNotEmpty, IsObject, 
    IsOptional, IsString, IsDecimal, IsNotEmptyObject, ValidateNested, IsNumber } from "class-validator";

class Punto{
   
    @IsNumber()
    @IsNotEmpty()
    latitud: number;

    
    @IsNotEmpty()
    @IsNumber()
    longitud: number
}

export class CrearViajeDto{

    @IsNotEmpty()
    @IsString()
    pasajero: string;

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => Punto)
    @ValidateNested()
    puntofinal: Punto;

    @IsObject()
    @IsNotEmptyObject() 
    @Type(() => Punto)
    @ValidateNested()
    puntoinicio: Punto;

    @IsString()
    @IsOptional()
    comentarios: string;

}