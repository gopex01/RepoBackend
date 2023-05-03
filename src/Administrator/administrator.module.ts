import { Module } from "@nestjs/common";
import { AdministratorEntity } from "./administrator.entity";
import { AdministratorController } from "./administrator.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([AdministratorEntity])],
    controllers:[AdministratorController],
    providers:[]
})
export class AdministratorModule{}