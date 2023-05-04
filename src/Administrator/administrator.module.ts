import { Module } from "@nestjs/common";
import { AdministratorEntity } from "./administrator.entity";
import { AdministratorController } from "./administrator.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PredmetEntity } from "src/Predmet/predmet.entity";
import { PredmetModule } from "src/Predmet/predmet.module";
import { ProfesorEntity } from "src/Profesor/profesor.entity";
import { ProfesorModule } from "src/Profesor/profesor.module";

@Module({
    imports:[TypeOrmModule.forFeature([AdministratorEntity]),TypeOrmModule.forFeature([PredmetEntity]),PredmetModule,
TypeOrmModule.forFeature([ProfesorEntity])],
    controllers:[AdministratorController],
    providers:[]
})
export class AdministratorModule{}