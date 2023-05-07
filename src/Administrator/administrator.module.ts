import { Module } from '@nestjs/common';
import { AdministratorEntity } from './administrator.entity';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredmetEntity } from 'src/Predmet/predmet.entity';
import { PredmetModule } from 'src/Predmet/predmet.module';
import { ProfesorEntity } from 'src/Profesor/profesor.entity';
import { ProfesorModule } from 'src/Profesor/profesor.module';
import { VerifikacioniKodEntity } from 'src/VerfikacioniKod/verifikacioni.kod.entity';
import { BrojKarticeEntity } from 'src/BrojKartice/broj.kartice.entity';
import { StudentEntity } from 'src/Student/student.entity';
import { IspitEntity } from 'src/Ispit/ispit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdministratorEntity]),
    TypeOrmModule.forFeature([PredmetEntity]),
    PredmetModule,
    TypeOrmModule.forFeature([ProfesorEntity]),
    TypeOrmModule.forFeature([VerifikacioniKodEntity]),
    TypeOrmModule.forFeature([BrojKarticeEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([IspitEntity])
  ],
  controllers: [AdministratorController],
  providers: [],
})
export class AdministratorModule {}
