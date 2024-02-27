const UserSchema = require("../models/user");
const resolver={
    hello: () =>{
        return "Hola Mundo";
    },
    User: async({id})=>{
        try{
            return user = await UserSchema.findById(id);
        }
        catch{
            console.log("error");
        }
    },
    Users: async() =>{
        try{
            return users = await UserSchema.find();
        }
        catch{
            console.log("error");
        }
    }
}

module.exports = resolver