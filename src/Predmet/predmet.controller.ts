import { Controller } from "@nestjs/common";
import { PredmetEntity } from "./predmet.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Controller('predmet')
export class PredmetController{

    constructor(@InjectRepository(PredmetEntity)
    private readonly predmetRepo:Repository<PredmetEntity>){}
}