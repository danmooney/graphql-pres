import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    users
} from './database';

let UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A person who uses our app',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString,
            resolve: (user) => `${user.firstName} ${user.lastName}`
        },
        interests: {
            type: new GraphQLList(GraphQLString)
        }
    })
});

let QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, args) => users[args.id] || null
        }
    })
});


let schema = new GraphQLSchema({
    query: QueryType

    // Uncomment the following after adding some mutation fields:
    // mutation: mutationType
});

export {
    schema
};