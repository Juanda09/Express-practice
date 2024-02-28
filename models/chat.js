const mongoose = require('mongoose');
const UserSchema = require('./user');

// Definición del esquema de chat utilizando Mongoose
const chatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    }],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Chat', chatSchema);
