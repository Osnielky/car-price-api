import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  color: string;
  @Column()
  soldPrice: number;
}
