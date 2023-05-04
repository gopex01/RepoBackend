import { PredmetEntity } from "src/Predmet/predmet.entity";
import { ProfesorEntity } from "src/Profesor/profesor.entity";
import { StudentEntity } from "src/Student/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Administrator',{name:'Administrator'})
export class AdministratorEntity{
    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Username:string;
    @Column()
    Password:string;
    @OneToMany(()=>StudentEntity, student=>student.Administrator,{
        eager:true
    })
    Studenti?:StudentEntity[];
    @OneToMany(()=>ProfesorEntity, profesor=>profesor.Administrator,{
        eager:true
    })
    Profesori?:ProfesorEntity[];
    
    @OneToMany(()=>PredmetEntity,predmet=>predmet.Administrator,{
        eager:true
    })
    Predmeti?:PredmetEntity[];
    
}