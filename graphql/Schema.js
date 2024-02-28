const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const resolvers = require('./resolvers');

// Define tipos GraphQL
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        last_name: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: UserType },
        to: { type: UserType },
        body: { type: GraphQLString },
        reader: { type: GraphQLBoolean }
    })
});

const HouseType = new GraphQLObjectType({
    name: 'House',
    fields: () => ({
        id: { type: GraphQLID },
        code: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        zip_code: { type: GraphQLString },
        rooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        parking: { type: GraphQLBoolean },
        price: { type: GraphQLInt }
    })
});

const UserFilterInputType = new GraphQLInputObjectType({
    name: 'UserFilterInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        last_name: { type: GraphQLString }
    })
});

// Define las consultas GraphQL
const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve:resolvers.hello,
        },
        message: {
            type: MessageType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.message
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve: resolvers.messages
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.User
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: resolvers.Users
        },
        house: {
            type: HouseType,
            args: {
                code: { type: GraphQLString }
            },
            resolve: resolvers.house
        },
        houses: {
            type: new GraphQLList(HouseType),
            resolve: resolvers.houses
        },
        usersByFilter: {
            type: new GraphQLList(UserType),
            args: {
                filter: { type: UserFilterInputType }
            },
            resolve: resolvers.UserByFilter
        }
    })
});

// Define el esquema GraphQL
const schema = new GraphQLSchema({
    query: QueryType
});

module.exports = schema;
