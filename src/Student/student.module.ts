import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./student.entity";
import {MailerModule} from '@nestjs-modules/mailer'
import { AdministratorModule } from "src/Administrator/administrator.module";
import { AdministratorEntity } from "src/Administrator/administrator.entity";

@Module({
    imports:[TypeOrmModule.forFeature([StudentEntity]),TypeOrmModule.forFeature([AdministratorEntity])],
    controllers:[StudentController],
    providers:[]
})
export class StudentModule{}