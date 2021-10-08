import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Account', {})
export class AccountOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;
}
