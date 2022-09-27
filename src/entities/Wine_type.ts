import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class Wine_type {
  @PrimaryGeneratedColumn()
	public id!: number;

  @Column()
  public name: string = ''

  @Column()
  public description: string = ''

}

export default Wine_type;