import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmerEntity } from "./smer.entity";
import { SmerController } from "./smer.controller";

@Module({
    imports:[TypeOrmModule.forFeature([SmerEntity])],
    providers:[],
    controllers:[SmerController]
})
export class SmerModule{}