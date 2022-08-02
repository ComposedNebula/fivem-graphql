// import { Field } from "type-graphql";
// import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// // import { Character } from "./Character";
// import { User } from "./User";

// export class Vehicle extends BaseEntity {
//     @Field()
//     @PrimaryGeneratedColumn()
//     id!: number

//     @Field()
//     @ManyToOne(() => User, (user) => user.vehicles)
//     owner!: User
    
//     @Field()
//     @Column() 
//     model!: string

//     @Field()
//     @Column() 
//     licensePlate!: string
// }