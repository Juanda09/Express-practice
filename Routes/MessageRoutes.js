const express = require("express");
const router = express.Router();
const MessageController = require("../Controllers/MessageController");


router.get('/message', MessageController.getMessages);
router.post('/message', MessageController.postMessage);

module.exports = router;