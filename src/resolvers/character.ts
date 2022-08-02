import { User } from "src/entities/User";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Character } from "../entities/Character";
import { orm } from "../index";

@ObjectType()
class CharacterArray {
    @Field(() => [Character])
    characters: Character[]
}


@Resolver((of) => Character)
export class CharacterResolver extends BaseEntity {
    @Mutation(() => Character)
    async createCharacter(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("gender") gender: string,
        @Arg("ownerId") ownerId: number
    ): Promise<Character | null> {
        const character = await orm
            .createQueryBuilder()
            .insert()
            .into(Character)
            .values({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                ownerId: ownerId,
            })
            .returning("*")
            .execute();

        return character.raw[0];
    }

    @Query(() => Character)
    async getCharacter(@Arg("id") id: number): Promise<Character | null> {
        return orm
            .getRepository(Character)
            .createQueryBuilder("c")
            .innerJoinAndSelect("c.owner", "u", 'u.id = c."ownerId"')
            .where("c.id = :id", { id: id })
            .getOne();
    }

    @Query(() => CharacterArray)
    async getAllCharacters(
        @Arg("ownerId") ownerId: number
    ): Promise<CharacterArray| null> {
        const characters = await orm
        .getRepository(Character)
        .createQueryBuilder("c")
        .innerJoinAndSelect("c.owner", "u", 'u.id = c."ownerId"')
        .where("c.ownerId = :ownerId", {ownerId: ownerId})
        .getMany()

        return {
            characters: characters
        }
    }
}
