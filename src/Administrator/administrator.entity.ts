import { PredmetEntity } from "src/Predmet/predmet.entity";
import { ProfesorEntity } from "src/Profesor/profesor.entity";
import { SmerEntity } from "src/Smer/smer.entity";
import { StudentEntity } from "src/Student/student.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('Administrator',{name:'Administrator'})
export class AdministratorEntity{
    @Column()
    Username:string;
    @Column()
    Password:string;
    @OneToMany(()=>StudentEntity, student=>student.Administrator)
    Studenti?:StudentEntity[];
   /* @OneToMany(()=>ProfesorEntity, profesor=>profesor.Administrator)
    Profesori?:ProfesorEntity[];
    @OneToMany(()=>PredmetEntity,predmet=>predmet.Administrator)
    Predmeti?:PredmetEntity[];
    @OneToMany(()=>SmerEntity,smer=>smer.Administrator)
    Smerovi?:SmerEntity[];*/
}