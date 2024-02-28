const { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const resolvers = require('./resolvers');
const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        lastname: { type: GraphQLString }
    })
})
const Message = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: User },
        to: { type: User },
        body: { type: GraphQLString },
        reader: { type: GraphQLBoolean }
    })
})
const House = new GraphQLObjectType({
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
})
const UserFilterInput = GraphQLInputObjectType({
    name: 'UserFilterInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        lastname: { type: GraphQLString }
    })
}
)

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: { type: GraphQLString },
        message: {
            type: Message,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.message
        },
        messages: {
            type: new GraphQLList(Message),
            resolve: resolvers.messages
        },
        user: {
            type: User,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.user
        },
        users: {
            type: new GraphQLList(User),
            resolve: resolvers.users
        },
        house: {
            type: House,
            args: {
                code: { type: GraphQLString }
            },
            resolve: resolvers.house
        },
        houses: {
            type: new GraphQLList(House),
            resolve: resolvers.houses
        },
        UserByFilter: {
            type: new GraphQLList(User),
            args: {
                filter: { type: UserFilterInput }
            },
            resolve: resolvers.UserByFilter
        }
    })
});

module.exports = schema