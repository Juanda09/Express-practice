const mongoose = require('mongoose ');
const UserSchema = require('./user');

const MessageSchema = new moongose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reader:{
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', MessageSchema);