import { StudentEntity } from 'src/Student/student.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Ispit', { name: 'Ispit' })
export class IspitEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  Naziv: string;
  @Column()
  Ocena: number = 0; //da moze da prijavi ispit bez ocene
  @Column()
  Rok: string;
  @Column()
  Godina: number;
  @Column()
  ESPB: number;
  @Column()
  Prijavljen: boolean = false;
  @Column()
  Polozen: boolean = false;
  @ManyToOne(() => StudentEntity, (student) => student.Ispiti)
  Student?: StudentEntity; //? da li treba nullable
}
