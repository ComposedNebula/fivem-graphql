import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    
    Entity,
    
    ManyToOne,
    
    
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
// import { Vehicle } from "./Vehicle";

interface ClothingTypes {

}

@ObjectType()
@Entity()
export class Character extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => User, {nullable: true})
    @ManyToOne(() => User, (user) => user.character)
    owner: User;

    @Field()
    @Column() 
    ownerId!: number;

    @Field()
    @Column({
        unique: true
    })
    firstName!: string;

    @Field()
    @Column()
    lastName!: string;

    @Field()
    @Column({
        default: 500,
    })
    cash: number;

    @Field()
    @Column({
        default: 0
    })
    bank: number;

    @Field()
    @Column()
    gender!: string;

    // @Field(() => JSON, {nullable: true})
    // @Column({
    //     type: "jsonb",
    //     nullable: true
    // }) 
    // clothes: {}

    //   @Field()
    //   @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
    //   vehicles!: Vehicle[]
}
