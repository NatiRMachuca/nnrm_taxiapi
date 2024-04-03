import { IsBoolean, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ModificarViajeDto{
    @IsString()
    @IsNotEmpty()
    estatus: string;

    @IsString()
    @IsOptional()
    comentarios: string;

}