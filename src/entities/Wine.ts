import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('Wine')
export class Wine {
  @PrimaryGeneratedColumn()
	public id!: number;

  @Column()
  public name: string = ''

  @Column()
  public winery: string = 'pari'

  @Column()
  public wineType: string = 'WineType'

  @Column()
  public description: string = 'text'

}

export default Wine;