import { Body, Controller, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdministratorEntity } from "./administrator.entity";
import { Repository } from "typeorm";

@Controller('administrator')
export class AdministratorController{
    
    constructor(@InjectRepository(AdministratorEntity)
    private readonly adminRepo:Repository<AdministratorEntity>){}

    @Post()
    async dodajAdministratora(@Body()input:AdministratorEntity){
        const admin={...input};
        if(!admin)
        {
            console.log("error");
            return null;
        }
        await this.adminRepo.save(admin);
    }
    @Post('loginAdmin/:user/:pass')
    async loginAdministrator(){};
    
}