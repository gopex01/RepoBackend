import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('VerifikacioniKod',{name:'VerifikacioniKod'})
export class VerifikacioniKodEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    VerifikacioniKod:number;
}