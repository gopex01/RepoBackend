import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SmerEntity } from "./smer.entity";
import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { error } from "console";
@Controller('smer')
export class SmerController{

    constructor(@InjectRepository(SmerEntity)
        private readonly smerRepo:Repository<SmerEntity>){}

    @Post()
    async dodajSmer(@Body()input:SmerEntity){
        const smer={...input};
        if(!smer){
            console.log("los unos");
            return error;
        }
        await this.smerRepo.save(smer);
    }
    @Delete('delete/:name')
    async obrisiSmer(@Param('name')name:string){
        const smer=await this.smerRepo.findOne({where:{Naziv:name}});
        if(!smer){
            console.log("ne postoji dati smer");
            return error;
        }
        await this.smerRepo.remove(smer);
    }
    
}