import fs from 'fs';
import path from 'path';

import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

let usersFile = path.join(__dirname, 'users.json');

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
            resolve: (_, args) => {
                let users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
                return users[args.id] || null;
            }
        }
    })
});


let schema = new GraphQLSchema({
    query: QueryType,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            insertOrUpdateUser: {
                type: UserType,
                args: {
                    id: {
                        type: GraphQLInt,
                    },
                    firstName: {
                        type: GraphQLString
                    },
                    lastName:  {
                        type: GraphQLString
                    },
                    interests: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve: (_, {id, firstName, lastName, interests}) => {
                    let users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

                    // if no id passed, we're doing an insert
                    if (!id) {
                        id = Math.max(...Object.keys(users)) + 1;
                        users[id] = {
                            id
                        };
                    }

                    if (firstName) {
                        users[id].firstName = firstName;
                    }

                    if (lastName) {
                        users[id].lastName = lastName;
                    }

                    if (interests) {
                        users[id].interests = interests;
                    }

                    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2)); // pretty print

                    return users[id];
                }
            }
        })
    })
});

export {
    schema
};