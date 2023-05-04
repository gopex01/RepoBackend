import { AdministratorEntity } from "src/Administrator/administrator.entity";
import { ProfesorEntity } from "src/Profesor/profesor.entity";
import { Entity, PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";

@Entity('Predmet',{name:'Predmet'})
export class PredmetEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Naziv:string;
    @Column()
    ESPB:number;
    @Column()
    Smer:string;
    @Column()
    Godina:number;
    @Column()
    Opis:string;
   @ManyToOne(()=>AdministratorEntity,administarotor=>administarotor.Predmeti)
    Administrator?:AdministratorEntity; 
    @ManyToOne(()=>ProfesorEntity,profesor=>profesor.Predmeti)
    Profesor?:ProfesorEntity;
}