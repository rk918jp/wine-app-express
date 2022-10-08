import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class WineType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string;
}

export default WineType;
