import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_token')
export class AccountToken {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'account_id'
  })
  accountId: number;

  @Column('varchar', {
    nullable: false,
    name: 'access_token'
  })
  accessToken: string;

  @Column('varchar', {
    nullable: false,
    name: 'refresh_token'
  })
  refreshToken: string;

  @Column('varchar', {
    nullable: false,
    name: 'created_at'
  })
  createdAt: Date;
}