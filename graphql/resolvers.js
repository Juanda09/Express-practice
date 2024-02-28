const UserSchema = require("../models/user");
const HouseSchema = require("../models/House");
const MessageSchema = require("../models/message");

const resolvers = {
    hello: () => {
        return "Hola Mundo";
    },
    message: async (_, { id }) => {
        try {
            return await MessageSchema.findById(id)
                .populate("from")
                .populate("to");
        } catch (error) {
            console.error("Error al buscar mensaje por ID:", error);
            throw error;
        }
    },
    messages: async () => {
        try {
            return await MessageSchema.find()
                .populate("from",)
                .populate("to");
        } catch (error) {
            console.error("Error al buscar mensajes:", error);
            throw error;
        }
    },
    
    User: async (_,{id}) => {
        try {
            return user = await UserSchema.findById(id);
        } catch (error) {
            console.error("Error al buscar usuario por ID:", error);
            throw error;
        }
    },
    Users: async () => {
        try {
            return users = await UserSchema.find();
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
            throw error;
        }
    },
    house: async (_,{code}) => {
        try {
            return house = await HouseSchema.findOne({ code: code });
        } catch (error) {
            console.error("Error al buscar casa por código:", error);
            throw error;
        }
    },
    houses: async () => {
        try {
            return houses = await HouseSchema.find();
        } catch (error) {
            console.error("Error al buscar casas:", error);
            throw error;
        }
    },
    UserByFilter: async ({ filter }) => {
        try {
            const query = {};
            if (filter) {
                if (filter.name) {
                    query.name = { $regex: filter.name, $options: "i" };
                }
                if (filter.email) {
                    query.email = { $regex: filter.email, $options: "i" };
                }
                if (filter.last_name) {
                    query.lastname = { $regex: filter.last_name, $options: "i" };
                }
            }
            // Implementa la lógica para buscar usuarios por filtro
        } catch (error) {
            console.error("Error al buscar usuarios por filtro:", error);
            throw error;
        }
    },
    messagesByUser: async (_,{ userId }) => {
        try {
            // Busca al usuario en la base de datos para obtener su información completa
            const user = await UserSchema.findById(userId);

            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            // Luego, busca los mensajes relacionados con el usuario por su ID
            const messages = await MessageSchema.find({ $or: [{ from: userId }, { to: userId }] })
            .populate("from")
            .populate("to");

            // Devuelve los mensajes encontrados junto con la información completa del usuario
            return messages;
        } catch (error) {
            console.error("Error al buscar mensajes por usuario:", error);
            throw error;
        }
    }
};

module.exports = resolvers;
