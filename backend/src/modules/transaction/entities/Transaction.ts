import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "../../users/entities/User";
import { Categories } from "./Categories";
import { TypeTransaction } from "./Type";

@Entity()
class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: TypeTransaction,
  })
  type: TypeTransaction;

  @Column()
  date: Date;

  @ManyToOne(() => Users, (user) => user.id, { onUpdate: "CASCADE" })
  user: Users;

  @ManyToOne(() => Categories, (category) => category.id, {
    onUpdate: "CASCADE",
  })
  category: Categories;

  @Column()
  value: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
