import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { compare } from 'bcryptjs';
import { AdministratorEntity } from 'src/Administrator/administrator.entity';
import { VerifikacioniKodEntity } from 'src/VerfikacioniKod/verifikacioni.kod.entity';
import { IspitEntity } from 'src/Ispit/ispit.entity';
@Controller('student')
export class StudentController {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repo: Repository<StudentEntity>,
    @InjectRepository(AdministratorEntity)
    private readonly adminRepository: Repository<AdministratorEntity>,
    @InjectRepository(VerifikacioniKodEntity)
    private readonly kodRepository: Repository<VerifikacioniKodEntity>,
    @InjectRepository(IspitEntity)
    private readonly ispitRepository: Repository<IspitEntity>,
  ) {}

  @Get('vratiSve')
  async vratiSveStudente() {
    return await this.repo.find();
  }
  @Get(':id')
  async vratiStudentaSaId(@Param('id') id: number) {}
  @Post('dodajStudenta/:kod')
  async dodajStudenta(@Body() input: StudentEntity, @Param('kod') kod: number) {
    const student = { ...input };
    if (!student) {
      console.log('los unos');
      return error;
    }
    const admin = await this.adminRepository.findOne({ where: { Id: 1 } });
    if (!admin) {
      console.log('nema ga admin');
      return null;
    }
    const verifikacioni = await this.kodRepository.findOne({
      where: { VerifikacioniKod: kod },
    });
    if (verifikacioni !== undefined && verifikacioni !== null) {
      const hashPass = await bcrypt.hash(student.Password, 10);
      student.TrenutniBrojOcena = 0;
      student.Prosek = 0;
      student.Password = hashPass;
      student.Administrator = admin;
      await this.repo.save(student);
      if (admin.Studenti === undefined) admin.Studenti = [];
      admin.Studenti.push(student);
      await this.adminRepository.save(admin);
      await this.kodRepository.delete(verifikacioni);
      return {
        status: 'success',
        message: 'student je uspesno dodat',
      };
    } else {
      return 'neispravan verifikacioni kod';
    }
  }
  @Get('loginStudent/:user/:pass')
  async login(@Param('user') user: string, @Param('pass') pass: string) {
    const student = await this.repo.findOne({ where: { Email: user } });
    if (!student) return null;
    const isPasswordValid = await compare(pass, student.Password);
    if (!isPasswordValid) return null;
    const token = jwt.sign({ sub: student.Id }, 'mySecretKey', {
      expiresIn: '1h',
    });
    console.log(student);
    return { student, token };
  }
  @Get('esbpUGodini/:indeks/:godina')
  async esbpUGodini(
    @Param('indeks') indeks: number,
    @Param('godina') godina: number,
  ) {
    const student = await this.repo.findOne({ where: { BrojIndexa: indeks } });
    let suma: number = student.Ispiti.filter(
      ((p) => p.Polozen === true) && ((p) => p.Godina === godina),
    ).reduce((acc: number, ispit: IspitEntity) => {
      return acc + ispit.ESPB;
    }, 0);
  }

  @Get('polozeniIspitiURoku/:indeks/:godina/:rok')
  async polozeniIspitiURoku(
    @Param('indeks') indeks: number,
    @Param('godina') godina: number,
    @Param('rok') rok: string,
  ) {
    const student = await this.repo.findOne({ where: { BrojIndexa: indeks } });
    const listaIspita = student.Ispiti.filter(
      (p) => p.Godina === godina && p.Rok === rok && p.Polozen === true,
    );
    return listaIspita;
  }

  @Get('vratiSveIspite/:Id')
  async vratiSveIspite(@Param('id')id:number)
  {
     const student=await this.repo.findOne({where:{Id:id}});
     if(!student)
     {
      console.log("error nema ga");
     }
     console.log(student.Ispiti);
     return student.Ispiti;
  }
  @Get('prijavljeniIspitiURoku/:indeks/:godina/:rok')
  async prijavljeniIspitiURoku(
    @Param('indeks') indeks: number,
    @Param('godina') godina: number,
    @Param('rok') rok: string,
  ) {
    const student = await this.repo.findOne({ where: { BrojIndexa: indeks } });
    const listaIspita = student.Ispiti.filter(
      (p) => p.Godina === godina && p.Rok === rok && p.Prijavljen === true,
    );
    return listaIspita;
  }
  @Post('prijaviIspit/:id/:naziv/:rok')
  async prijaviIspit(@Param('id')id:number,@Param('naziv') naziv:string,@Param('rok')rok:string)
  {
      const student:StudentEntity=await this.repo.findOneOrFail({where:{Id:id}});
      if(!student){
        console.log("ne postoji takav student");
      }
     student.Ispiti.forEach(async x=>{
      if(x.Naziv===naziv){
        let ispit=await this.ispitRepository.findOneOrFail({where:{Naziv:naziv}});
        ispit.Rok=rok;
        ispit.Prijavljen=true;
        await this.ispitRepository.save(ispit);
      }
     })

  }
 /* @Post('prijaviIspit/:indeks/:naziv/:godina/:rok/:espb')
  async prijaviIspit(
    @Param('indeks') indeks: number,
    @Param('naziv') naziv: string,
    @Param('godina') godina: number,
    @Param('rok') rok: string,
    @Param('espb') espb: number,
  ) {
    const student = await this.repo.findOne({ where: { BrojIndexa: indeks } });
    if (!student) return null;
    let postojeciIspit = await this.ispitRepository.findOne({
      where: { Naziv: naziv },
    });
    if (
      postojeciIspit !== null &&
      postojeciIspit !== undefined &&
      postojeciIspit.Polozen === true
    ) {
      return ' Student je vec polozio ovaj ispit';
    }
    if (postojeciIspit === null || postojeciIspit === undefined) {
      //nikad nije polagao ispit
      let ispit: IspitEntity = new IspitEntity();
      ispit.Naziv = naziv;
      ispit.Godina = godina;
      ispit.Rok = rok;
      ispit.ESPB = espb;
      ispit.Prijavljen = true;
      this.ispitRepository.save(ispit);
      student.Ispiti.push(ispit);
      return ' student je uspesno prijavio ovaj ispit po prvi put';
    }
    if (
      postojeciIspit !== null &&
      postojeciIspit !== undefined &&
      postojeciIspit.Prijavljen === true
    ) {
      return ' student je vec prijavio ovaj ispit';
    }
    if (
      postojeciIspit !== null &&
      postojeciIspit !== undefined &&
      postojeciIspit.Prijavljen === false
    ) {
      //vec polagao ispit ali ga nije polozio
      postojeciIspit.Godina = godina;
      postojeciIspit.Rok = rok;
      postojeciIspit.Prijavljen = true;
      this.ispitRepository.save(postojeciIspit);
    }
  }*/
  @Post('poloziIspit/:indeks/:naziv/godina/:rok/:ocena')
  async poloziIspit(
    @Param('indeks') indeks: number,
    @Param('naziv') naziv: string,
    @Param('godina') godina: number,
    @Param('rok') rok: string,
    @Param('ocena') ocena: number,
  ) {}
}
