import chatHistory from "../models/chatHistory_model.js";

const runSocketIO = (io) => {

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinRoom', async (room) => {
            socket.join(room)
            console.log(`Client joined room: ${room}`);

            const messages = await chatHistory.find({ room }).sort({ createdAt: 1 })
            if (messages) {
                socket.emit('chatHistory', messages)
            }
        })
        socket.on("chatMessage", async (data) => {

            const chat = await chatHistory.create(data)

            io.to(data.room).emit('chatMessage', `${data.sender}: ${data.message}`)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

}

export default runSocketIO