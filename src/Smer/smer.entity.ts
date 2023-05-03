import { AdministratorEntity } from "src/Administrator/administrator.entity";
import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('smer',{name:'Smer'})
export class SmerEntity{

    @PrimaryGeneratedColumn()
    IdSmera:number;
    @Column()
    Naziv:string;
   /* @ManyToOne(()=>AdministratorEntity,administrator=>administrator.Smerovi)
    Administrator?:AdministratorEntity;*/

}