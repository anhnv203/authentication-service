import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_detail')
export class AccountDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column('bigint', {
    nullable: false,
    name: 'account_id',
  })
  accountId: number;

  @Column('varchar', {
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column('varchar', {
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column('varchar', {
    nullable: true,
    name: 'identity_number',
  })
  identityNumber: string;

  @Column('datetime', {
    nullable: false,
    name: 'birthday',
  })
  birthday: Date;

  @Column('text', {
    nullable: true,
    name: 'avatar',
  })
  avatar: string;

  @Column('tinyint', {
    nullable: false,
    name: 'gender',
  })
  gender: boolean;

  @Column('varchar', {
    nullable: true,
    name: 'city_id',
  })
  cityId: number;

  @Column('int', {
    nullable: true,
    name: 'district_id',
  })
  districtId: number;

  @Column('int', {
    nullable: true,
    name: 'country_id',
  })
  countryId: number;

  @Column('varchar', {
    nullable: true,
    name: 'address',
  })
  address: string;

  @Column('int', {
    nullable: true,
    name: 'role_id',
  })
  roleId: number;

  @Column('varchar', {
    nullable: true,
    name: 'account_type',
  })
  accountType: string;
}
