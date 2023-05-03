import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PredmetEntity } from "./predmet.entity";
import { PredmetController } from "./predmet.controller";

@Module({
    imports:[TypeOrmModule.forFeature([PredmetEntity])],
    controllers:[PredmetController],
    providers:[]
})
export class PredmetModule{}