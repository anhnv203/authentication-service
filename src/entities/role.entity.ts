import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'role_name',
  })
  roleName: string;

  @Column('tinyint', {
    nullable: false,
    name: 'is_active',
  })
  isActive: Boolean;

}
