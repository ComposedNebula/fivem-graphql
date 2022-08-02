import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata"
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { Character } from "./entities/Character";
import { User } from "./entities/User";
import { CharacterResolver } from "./resolvers/character";
import { UserResolver } from "./resolvers/user";

export const orm = new DataSource({
    type: "postgres",
    database: "fivem",
    username: "postgres",
    password: "root",
    logging: true,
    synchronize: true,
    entities: [User, Character],
})

async function main () {
    const app = express()
    await orm.initialize()
    // await orm.manager.delete(User, {})
    // await orm.manager.delete(Character, {})

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, CharacterResolver],
            validate: false,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
    
    
}

main().catch((err) => {
    console.log("error starting", err)
})