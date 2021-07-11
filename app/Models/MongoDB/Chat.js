const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        max: 25,
    },
    description: {},
    image: {},
    voice: {},
    state: {},
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
