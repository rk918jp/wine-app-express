import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import Winery from "./Winery";
import WineType from "./WineType";
import Image from "./Image";

@Entity('Wine')
export class Wine {
  @PrimaryGeneratedColumn()
	id!: number;

  @Column()
  name!: string; 

  @Column({
    type: "text",
    nullable: true,
  })
  description!: string;

  @ManyToOne(() => Winery, (winery) => winery.wines)
  winery!: Winery;

  @ManyToMany(() => WineType)
  @JoinTable()
  wineTypes!: WineType[];

  @ManyToOne(() => Image)
  @JoinTable()
  image!: Image[];

}

export default Wine;