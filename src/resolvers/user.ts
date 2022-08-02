import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { orm } from "../index";

@ObjectType()
class UserArray {
  @Field(() => [User])
  users: User[]
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("steamId") steamId: string,
    @Arg("steamName") steamName: string,
    @Arg("ip") ip: string
  ): Promise<User| null> {
    const user = await orm
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        steamId: steamId,
        steamName: steamName,
        ip: ip,
      })
      .returning("*")
      .execute();

    return user.raw[0]
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("steamId") steamId: string): Promise<User | null> {
    return User.findOne({ where: { steamId: steamId } });
  }

  @Query(() => UserArray)
  async getAllUsers(): Promise<UserArray> {
    const users = await User.find({})
    return {
      users: users
    }
  }
}

