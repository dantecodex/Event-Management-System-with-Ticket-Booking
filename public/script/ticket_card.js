document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io()

    const eventRoom = document.getElementById('eventRoom').value
    socket.emit("joinRoom", eventRoom)

    const sender = document.getElementById('userName').value
    const chatForm = document.getElementById('chatForm')
    const chatInput = document.getElementById('chatInput')
    const chatMessages = document.getElementById('chatMessages')


    chatForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const message = chatInput.value
        if (message.trim()) {
            socket.emit('chatMessage', { sender, room: eventRoom, message })
            chatInput.value = ''
        }
    })

    function scrollToBottom() {
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    socket.on('chatHistory', (message) => {
        chatMessages.innerHTML = ''
        message.forEach(msg => {
            const messageElement = document.createElement('li');
            messageElement.textContent = `${msg.sender}: ${msg.message}`;
            chatMessages.appendChild(messageElement);
        });
        scrollToBottom()
    })


    socket.on('chatMessage', (message) => {
        const messageElement = document.createElement('li');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);

        scrollToBottom()
    });
})