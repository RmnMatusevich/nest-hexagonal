import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Account', {})
export class ActivityOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: number;

  @Column()
  ownerAccountId: string;

  @Column()
  sourceAccountId: string;

  @Column()
  targetAccountId: string;

  @Column()
  amount: number;
}
