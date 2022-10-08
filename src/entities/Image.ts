import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from 'typeorm'
import Wine from './Wine';
// import Winery from "./Winery";
// import WineType from "./WineType";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
	id!: number;

  @Column({ type: 'varchar', nullable: true })
  name! : string;
  // name!: any | null;

  @ManyToOne(() => Wine, (wine) => wine.id)
  type!:  Image[]
}

export default Image;