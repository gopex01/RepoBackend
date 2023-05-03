import { Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany } from "typeorm";
import { Komentar } from "./komentar";
import { AdministratorEntity } from "src/Administrator/administrator.entity";
import { PredmetEntity } from "src/Predmet/predmet.entity";

@Entity('Profesor',{name:'Profesor'})
export class ProfesorEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Ime:string;
    @Column()
    Prezime:string;
    @Column()
    IdBrojKartice:number;
    @Column()
    Email:string;
    @Column()
    Password:string;
    @Column()
    DatumRodjenja:string;
    @Column()
    JMBG:string;
    @Column()
    RadniStaz:number;
    @Column()
    ImeRoditelja:string;
    @Column()
    ProsecnaOcena:number;
    ListaKomentara?:Komentar[];
    /*@ManyToOne(()=>AdministratorEntity, administrator=>administrator.Profesori)
    Administrator?:AdministratorEntity;
    @OneToMany(()=>PredmetEntity,predmet=>predmet.Profesor)
    Predmeti?:PredmetEntity[];*/
}