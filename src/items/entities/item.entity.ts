import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Item {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
