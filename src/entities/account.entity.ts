import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column('text', {
    nullable: false,
    name: 'password_hash',
  })
  passwordHash: string;

  @Column('text', {
    nullable: false,
    name: 'password_salt',
  })
  passwordSalt: string;

  @Column('int', {
    nullable: true,
    name: 'facebook_id',
  })
  facebookId: number;

  @Column('int', {
    nullable: true,
    name: 'google_id',
  })
  googleId: number;

  @Column('datetime', {
    nullable: true,
    name: 'created_at',
  })
  createdAt: Date;

  @Column('datetime', {
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column('datetime', {
    nullable: true,
    name: 'deleted_at',
  })
  deletedAt: Date;

}
