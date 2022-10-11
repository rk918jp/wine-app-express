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

  @Column({
    type: "text",
    nullable: true,
  })
  oneWord: string;

  @Column({
    type: "text",
    nullable: true,
  })
  country: string;

  @Column({
    type: "text",
    nullable: true,
  })
  breed: string;

  @Column({
    type: "text",
    nullable: true,
  })
  link: string;

  @ManyToOne(() => Winery, (winery) => winery.wines)
  winery!: Winery;

  @ManyToMany(() => WineType)
  @JoinTable()
  wineTypes!: WineType[];

  @ManyToOne(() => Image, (image) => image.wines)
  image!: Image;
  wine: any;

}

export default Wine;