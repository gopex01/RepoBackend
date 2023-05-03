import { Controller, Get,Post,Param,Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProfesorEntity } from "./profesor.entity";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {compare} from 'bcryptjs'
import {error} from "console";
import { InjectRepository } from "@nestjs/typeorm";
@Controller('profesor')
export class ProfesorController{

    constructor(@InjectRepository(ProfesorEntity)
        private readonly repoProfesor:Repository<ProfesorEntity>){}

    @Get()
    async vratiSveProfesore(){
        return await this.repoProfesor.find();
    }
    @Post()
    async dodajProfesora(@Body() input:ProfesorEntity){

        const profesor={...input};
        if(!profesor){
            console.log("Los unos");
            return error;
        }
        const hashPass=await bcrypt.hash(profesor.Password,10);
        profesor.Password=hashPass;
        await this.repoProfesor.save(profesor);
        return {
            status:'success',
            message:'Profesor je uspesno dodat'
        }
    }
    @Get('loginProfesor/:user/:pass')
    async login(@Param('user') user:string ,@Param('pass') pass:string){

        console.log(user);
        console.log(pass);
        const profesor=await this.repoProfesor.findOneOrFail({where:{Email:user}});
        if(!profesor){
            console.log("ne postoji");
        return null;
        }
        const isPasswordValid=await compare(pass,profesor.Password);
        if(!isPasswordValid)
        return null;
        const token=jwt.sign({sub:profesor.Id},'mySecretKey');
        console.log(profesor);
        return {
            profesor,
            token
        };
    }
}