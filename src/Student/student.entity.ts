
import { AdministratorEntity } from "src/Administrator/administrator.entity";
import {Entity, PrimaryGeneratedColumn,Column, ManyToOne} from "typeorm";
@Entity('Student',{name:'Student'})
export class StudentEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Ime:string;
    @Column()
    Prezime:string;
    @Column()
    BrojTelefona:string;
    @Column()
    Email:string;
    @Column()
    Password:string;
    @Column()
    Prosek?:number;
    @Column()
    BrojIndexa:number;
    @Column()
    TrenutnaGodinaStudija:number;
    @Column()
    ImeRoditelja:string;
    @Column()
    DatumRodjenja:string;
    @Column()
    JMBG:string;
    @Column()
    Smer:string;
    TrenutniBrojOcena?:number;
    @ManyToOne(()=>AdministratorEntity, administrator=>administrator.Studenti)
    Administrator?:AdministratorEntity;
    
    
 }