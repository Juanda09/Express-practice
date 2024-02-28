const MessageSchema = require("../models/message");
const { validationResult } = require('express-validator');

exports.getMessages = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let messages = await MessageSchema.find().populate({ path: "from", select: "-password" }).populate({ path: "to", select: "-password" })
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }

};

exports.postMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const message = new MessageSchema({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to,
    });
    try {
        let mensaje = await message.save();
        res.status(200).json(mensaje);
    }
    catch (err) {
        res.status(400).json("Error: " + err);
    }
}
