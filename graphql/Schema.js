const {buildSchema} = require("graphql")

const schema = buildSchema(`
    type Message {
        id: ID!
        from: User!
        to: User!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        password: <PASSWORD>!
    }
    type House {
        id: ID!
        address: String!
        city: String!
        state: String!
        size: Int!
        type: String!
        zip_code: String!
        rooms: Int!
        code: String!
    }
    type Query {
        hello:string
        message(id: ID!): Message
        messages: [Message]
        user(id: ID!): User
        users: [User]
        house(code: code!): House
        houses:[House]
        UserByFilter(filter:UserFilterInput): [User]
    }
    input UserFilterInput{
        name:String
        email:String
        lastname:String
    }
    
    schema {
        query: Query
    }
    `)

module.exports = schema