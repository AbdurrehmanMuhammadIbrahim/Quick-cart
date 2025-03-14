// const Message = require("../models/Chat");

// // Send a message
// exports.sendMessage = async (req, res) => {
//   const { sender, receiver, message } = req.body;

//   try {
//     const newMessage = new Message({ sender, receiver, message });
//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all messages between two users
// exports.getMessages = async (req, res) => {
//   const { senderId, receiverId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: senderId, receiver: receiverId },
//         { sender: receiverId, receiver: senderId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Controller to Get All Messages
// exports.getAllMessages = async (req, res) => {
//     try {
//       const messages = await Message.find().populate("sender receiver", "name email");
//       res.status(200).json(messages);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };



const Conversation = require('../models/Chat')

// Send a message
// exports.sendMessage = async (req, res) => {
//   const { senderId, receiverId, message } = req.body;

//   try {
//     let conversation = await Conversation.findOne({ user: senderId });

//     if (!conversation) {
//       conversation = new Conversation({ user: senderId, admin: receiverId, messages: [] });
//     } else if (!conversation.admin && receiverId) {
//       conversation.admin = receiverId;
//     }

//     conversation.messages.push({ sender: senderId, text: message });
//     await conversation.save();

//     res.status(200).json(conversation);
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending message', error });
//   }
// };
exports.sendMessage = async (req, res) => {
  const { conversationId, senderId, message } = req.body;

  try {
    // Find the conversation using the conversationId
    let conversation = await Conversation.findById(conversationId);

    // If conversation doesn't exist, return an error
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Add the new message to the conversation
    const newMessage = {
      sender: senderId,
      text: message,
      timestamp: new Date(),
    };

    conversation.messages.push(newMessage);
    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error });
  }
};


// Get active conversations
exports.getAllConversation = async (req, res) => {
  try {
    const allConversations = await Conversation.find().populate('user', 'name')
    // res.json(allConversations);
    res.status(200).json(allConversations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};


// Get conversation between user and admin
exports.getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await Conversation.findOne({ user: userId })
      .populate('user', 'name')
      .populate('admin', 'name');

    if (!conversation) {
      return res.status(404).json({ message: 'No conversation found' });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving conversation', error });
  }
};



