import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import Wine from "./Wine";

@Entity('Winery')
export class Winery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string;

  @OneToMany(() => Wine, (wine) => wine.winery)
  wines!: Wine[];
}


export default Winery;