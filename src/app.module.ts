import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './Student/student.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './Student/student.entity';
import { ProfesorEntity } from './Profesor/profesor.entity';
import { ProfesorModule } from './Profesor/profesor.module';
import { PredmetEntity } from './Predmet/predmet.entity';
import { PredmetModule } from './Predmet/predmet.module';
import { AdministratorEntity } from './Administrator/administrator.entity';
import { AdministratorModule } from './Administrator/administrator.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: null,
      database: 'primer5',
      autoLoadEntities: true,
      entities: [
        StudentEntity,
        ProfesorEntity,
        PredmetEntity,
        AdministratorEntity,
      ],
      synchronize: true,
    }),
    StudentModule,
    ProfesorModule,
    PredmetModule,
    AdministratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
