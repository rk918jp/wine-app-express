import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('Wine')
export class Wine {
  @PrimaryGeneratedColumn()
	public id!: number;

  @Column()
  public name: string = ''

  @Column({ default: 'Winery' })
  public winery!: string;

  @Column({ default: 'WineType' })
  public wineType!: string;

  @Column()
  public description: string = 'text'

}

export default Wine;