import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './Character';
// import { Character } from './Character';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({unique: true})
    steamId!: string

    @Field()
    @Column({unique: true})
    steamName!: string

    @Field()
    @Column()
    ip!: string

    @Field(() => Character)
    @OneToMany(() => Character, (character) => character.owner)
    character!: Character[]

    @Field(() => String)
    @CreateDateColumn()
    dateCreated!: Date
}