import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { error } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorEntity } from 'src/Administrator/administrator.entity';
import { BrojKarticeEntity } from 'src/BrojKartice/broj.kartice.entity';
@Controller('profesor')
export class ProfesorController {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly repoProfesor: Repository<ProfesorEntity>,
    @InjectRepository(AdministratorEntity)
    private readonly adminRepo: Repository<AdministratorEntity>,
    @InjectRepository(BrojKarticeEntity)
    private readonly karticaRepo: Repository<BrojKarticeEntity>,
  ) {}

  @Get()
  async vratiSveProfesore() {
    return await this.repoProfesor.find();
  }
  @Post('dodajProfesora')
  async dodajProfesora(@Body() input: ProfesorEntity) {
    const profesor = { ...input };
    if (!profesor) {
      console.log('Los unos');
      return error;
    }
    const admin = await this.adminRepo.findOne({ where: { Id: 1 } });
    if (!admin) {
      console.log('ne postoji admin');
      return null;
    }
    const kartica = await this.karticaRepo.findOne({
      where: { BrojKartice: profesor.IdBrojKartice },
    });
    if (kartica !== null && kartica !== undefined) {
      const hashPass = await bcrypt.hash(profesor.Password, 10);
      profesor.Password = hashPass;
      profesor.TrenutniBrojOcena = 0;
      profesor.ProsecnaOcena = 0;
      profesor.Administrator = admin;
      await this.repoProfesor.save(profesor);
      if (admin.Profesori === undefined) {
        admin.Profesori = [];
      }
      admin.Profesori.push(profesor);
      await this.adminRepo.save(admin);
      await this.karticaRepo.delete(kartica);
      return {
        status: 'success',
        message: 'Profesor je uspesno dodat',
      };
    } else {
      return 'neispravan broj kartice';
    }
  }
  @Get('loginProfesor/:user/:pass')
  async login(@Param('user') user: string, @Param('pass') pass: string) {
    console.log(user);
    console.log(pass);
    const profesor = await this.repoProfesor.findOneOrFail({
      where: { Email: user },
    });
    if (!profesor) {
      console.log('ne postoji');
      return null;
    }
    const isPasswordValid = await compare(pass, profesor.Password);
    if (!isPasswordValid) return null;
    const token = jwt.sign({ sub: profesor.Id }, 'mySecretKey');
    console.log(profesor);
    return {
      profesor,
      token,
    };
  }
  @Get('vratiSvePredmete/:jmbg')
  async vratiSvePredmete(@Param('jmbg') jmbg: string) {
    const profesor = await this.repoProfesor.findOneOrFail({
      where: { JMBG: jmbg },
    });
    if (!profesor) {
      console.log('ne postoji profeosr');
      return null;
    }
    const predmeti = await profesor.Predmeti;
    return predmeti;
  }
}
