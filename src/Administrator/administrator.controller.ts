import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdministratorEntity } from "./administrator.entity";
import { Repository } from "typeorm";
import { error } from "console";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {compare} from 'bcryptjs'
import { PredmetEntity } from "src/Predmet/predmet.entity";
import { ProfesorEntity } from "src/Profesor/profesor.entity";
@Controller('administrator')
export class AdministratorController{
    
    constructor(@InjectRepository(AdministratorEntity)
    private readonly adminRepo:Repository<AdministratorEntity>,
    @InjectRepository(PredmetEntity)
    private readonly predmetRepo:Repository<PredmetEntity>,
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepo:Repository<ProfesorEntity>){}

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
    @Post('dajPraznu')
    async praznaLista(){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        admin.Studenti=[];
        await this.adminRepo.save(admin);
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
    @Get('vratiSveStudente')
    async vratiStudente(){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        if(!admin){
            console.log("ne postoji admin");
        }
        const studenti=await admin.Studenti;
        return admin.Studenti;
    }
    @Get('vratiSveProfesore')
    async vratiProfesore(){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        if(!admin){
            console.log("ne postoji admin");
        }
        const profesori=await admin.Profesori;
        return admin.Profesori;
    }
    @Post('dodajPredmet/:jmbg')
    async dodajPredmet(@Body() input:PredmetEntity,@Param('jmbg')jmbg:string){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        if(!admin){
            console.log("ne postoji admin");
        }
        if(admin.Predmeti===undefined)
        {
            admin.Predmeti=[];
        }
        const predmet:PredmetEntity={...input};
        if(!predmet){
            console.log("nije predmet");
            return null;
        }
        const profesor=await this.profesorRepo.findOneOrFail({where:{JMBG:jmbg}});
        if(!profesor){
            console.log("ne postoji taj profesor");
            return null;
        }
        predmet.Profesor=profesor;
        predmet.Administrator=admin;
        await this.predmetRepo.save(predmet);
        profesor.Predmeti.push(predmet);
        await this.profesorRepo.save(profesor);
        admin.Predmeti.push(predmet);
        await this.adminRepo.save(admin);
        return {
            success:'success',
            message:'uspesno dodat predmet'
        }

    }
    @Get('vratiSvePredmete')
    async vratiPredmete(){
        const admin=await this.adminRepo.findOne({where:{Id:1}});
        if(!admin)
        {
            console.log("ne postoji admin");
            return null;
        }
        const predmeti=await admin.Predmeti;
        return predmeti;
    }
    @Post('dodajPredmetStudentu/:nazivPredmeta/:brojIndexa')
    async dodajPredmetStudentu(@Param('nazivPredmeta') nazivP:string,@Param('brojIndexa')brojIndexa:number){
        
    }
    
}