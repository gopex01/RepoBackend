import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BrojKartice', { name: 'BrojKartice' })
export class BrojKarticeEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column()
  BrojKartice: number;
}
