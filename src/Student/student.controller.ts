import { Controller, Get,Post,Body,Param, NotFoundException } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm"
import { StudentEntity } from "./student.entity";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { error } from "console";
import {compare} from 'bcryptjs'
@Controller('student')
export class StudentController{
    
    constructor(@InjectRepository(StudentEntity)
    private readonly repo:Repository<StudentEntity>){}

    @Get('vratiSve')
    async vratiSveStudente()
    {
        return await this.repo.find();
    }
    @Get(':id')
    async vratiStudentaSaId(@Param('id') id:number){

    }
    @Post()
    async dodajStudenta(@Body() input:StudentEntity){
        const student={...input};
        if(!student){
        console.log("los unos");
        return error;
        }
        const hashPass=await bcrypt.hash(student.Password,10);
        student.Password=hashPass;
        await this.repo.save(student);
       
        return {
            status:'success',
            message:'student je uspesno dodat'
        }
    }
    @Get('loginStudent/:user/:pass')
    async login(@Param('user') user:string,@Param('pass') pass:string){

        const student=await this.repo.findOneOrFail({where:{Email:user}});
        if(!student)
        return null;
        const isPasswordValid=await compare(pass,student.Password);
        if(!isPasswordValid)
        return null;
        const token=jwt.sign({sub:student.Id},'mySecretKey',{expiresIn:'1h'})
       console.log(student);
        return  {student,token}
    }
}
