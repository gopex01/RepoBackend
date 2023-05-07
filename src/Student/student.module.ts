import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdministratorModule } from 'src/Administrator/administrator.module';
import { AdministratorEntity } from 'src/Administrator/administrator.entity';
import { VerifikacioniKodEntity } from 'src/VerfikacioniKod/verifikacioni.kod.entity';
import { IspitEntity } from 'src/Ispit/ispit.entity';
import { ProfesorEntity } from 'src/Profesor/profesor.entity';
import { KomentarEntity } from 'src/Komentar/komentar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([AdministratorEntity]),
    TypeOrmModule.forFeature([VerifikacioniKodEntity]),
    TypeOrmModule.forFeature([IspitEntity]),
    TypeOrmModule.forFeature([ProfesorEntity]),
    TypeOrmModule.forFeature([KomentarEntity])
  ],
  controllers: [StudentController],
  providers: [],
})
export class StudentModule {}
