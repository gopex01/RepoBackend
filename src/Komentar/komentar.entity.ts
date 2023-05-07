import { ProfesorEntity } from "src/Profesor/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('komentar',{name:'komentar'})
export class KomentarEntity{

    @PrimaryGeneratedColumn()
    Id:number;
    @Column()
    Komentar:string;
    @Column()
    Ocena?:number;
    @ManyToOne(()=>ProfesorEntity,(profesor)=>profesor.Komentari,)
    Profesor?:ProfesorEntity;
}