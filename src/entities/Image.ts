import {Entity, PrimaryGeneratedColumn, Column, OneToMany,} from 'typeorm'
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

  @Column()
  src: string;

  @OneToMany(() => Wine, (wine) => wine.image)
  wines!: Wine[];

}

export default Image;