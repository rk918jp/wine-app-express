import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import Winery from "./Winery";
import WineType from "./WineType";

@Entity('Wine')
export class Wine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Winery, (winery) => winery.wines)
  winery: Winery;

  @ManyToMany(() => WineType)
  @JoinTable()
  wineTypes: WineType[];
}

export default Wine;