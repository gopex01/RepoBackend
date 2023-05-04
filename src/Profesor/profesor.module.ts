import { Module } from "@nestjs/common";
import { ProfesorController } from "./profesor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfesorEntity } from "./profesor.entity";
import { AdministratorEntity } from "src/Administrator/administrator.entity";
import { AdministratorModule } from "src/Administrator/administrator.module";

@Module({
    imports:[TypeOrmModule.forFeature([ProfesorEntity]),TypeOrmModule.forFeature([AdministratorEntity]),AdministratorModule],
    controllers:[ProfesorController],
    providers:[]
})
export class ProfesorModule{}