import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdministratorEntity } from "./administrator.entity";
import { Repository } from "typeorm";
import { error } from "console";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {compare} from 'bcryptjs'
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
            return error;
        }
        const hashPass=await bcrypt.hash(admin.Password,10);
        admin.Password=hashPass;
        await this.adminRepo.save(admin);
        return {
            status:'success',
            message:'Administrator dodat'
        }
    }
    @Post('loginAdmin/:user/:pass')
    async loginAdministrator(@Param('user')user:string,@Param('pass')pass){
        const admin=await this.adminRepo.findOneOrFail({where:{Username:user}});
        if(!admin){
        return null;
        }
        const isPasswordValid=await compare(pass,admin.Password);
        if(!isPasswordValid){
            return null;
        }
        const token=jwt.sign({sub:admin.Username},'mySecretKey',{expiresIn:'1h'});
        console.log(admin);
        return {admin,token}
    }
    @Get('vratiStudente')
    async vratiStudente(){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        if(!admin){
            console.log("ne postoji admin");
        }
        console.log(admin);
        return admin.Studenti;
    }
    
}