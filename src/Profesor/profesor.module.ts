import { Module } from "@nestjs/common";
import { ProfesorController } from "./profesor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfesorEntity } from "./profesor.entity";

@Module({
    imports:[TypeOrmModule.forFeature([ProfesorEntity])],
    controllers:[ProfesorController],
    providers:[]
})
export class ProfesorModule{}