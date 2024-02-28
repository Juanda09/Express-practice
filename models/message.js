const mongose = require('mongoose');

const MessageSchema = new mongose.Schema({
    from: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reader: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongose.model('Message', MessageSchema);