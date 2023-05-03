import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./student.entity";
import {MailerModule} from '@nestjs-modules/mailer'

@Module({
    imports:[TypeOrmModule.forFeature([StudentEntity]),],
    controllers:[StudentController],
    providers:[]
})
export class StudentModule{}