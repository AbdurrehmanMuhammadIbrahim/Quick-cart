// const express = require("express");
// const router = express.Router();
// const { sendMessage, getMessages ,getAllMessages} = require("../controllers/chatController");

// // Send a message
// router.post("/send", sendMessage);

// // Get all messages between two users
// router.get("/:senderId/:receiverId", getMessages);


// // Get All Messages Route
// router.get("/messages", getAllMessages);
// module.exports = router;

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/conversations', chatController.getAllConversation );
router.get('/:userId', chatController.getConversation);



module.exports = router;
