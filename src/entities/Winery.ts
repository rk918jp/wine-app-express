import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('Winery')
export class Winery {
  @PrimaryGeneratedColumn()
	public id!: number;

  @Column()
  public name: string = ''

  @Column()
  public description: string = ''

}

export default Winery;