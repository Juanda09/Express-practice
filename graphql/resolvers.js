const UserSchema = require("../models/user");
const resolver = {
    hello: () => {
        return "Hola Mundo";
    },
    User: async ({ id }) => {
        try {
            return user = await UserSchema.findById(id);
        }
        catch (e) {
            console.log(e);
        }
    },
    Users: async () => {
        try {
            return users = await UserSchema.find();
        }
        catch (e) {
            console.log(e);
        }
    },
    UserByFilter: async (filter) => {
        try {
            let query = {}
            if (filter) {
                if (filter.name) {
                    query.name = { $regex: filter.name, $options: "i" }
                }
                if (filter.email) {
                    query.email = { $regex: filter.email, $options: "i" }
                }
                if (filter.lastname) {
                    query.lastname = { $regex: filter.lastname, $options: "i" }
                }
            }
            return users = await UserSchema.find(query);
        }
        catch (e) {
            console.log(e);
        }
    }

}

module.exports = resolver