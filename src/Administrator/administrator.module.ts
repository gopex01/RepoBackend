import { Module } from "@nestjs/common";
import { AdministratorEntity } from "./administrator.entity";
import { AdministratorController } from "./administrator.controller";

@Module({
    imports:[AdministratorEntity],
    controllers:[AdministratorController],
    providers:[]
})
export class AdministratorModule{}