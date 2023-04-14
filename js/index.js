"use strict";

const chat = {
    author: "kobeBerckmans",
    init() {
        document.getElementById('chatForm').addEventListener("submit", (e) => {
            e.preventDefault();
            this.sendMessage();
        })

        this.fetchMessages()
    },
    sendMessage() {
        const messageInput = document.getElementById('chatInput').value;
        console.log(messageInput);
        fetch(
            'https://dev2chat.onrender.com/message',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "no-cors",
                body: JSON.stringify({
                    author: this.author,
                    messageInput: messageInput
                })
            }
        ).then(
            (res) => {
                console.log(res);
                this.fetchMessages();
                messageInput = "";
            }
        ).catch((e) => {
            console.error("could not send")
        })
    },
    fetchMessages() {
        fetch("https://dev2chat.onrender.com/messages")
        .then(res => res.json())
        .then((response) => {
            const chatMessage = document.getElementById('messageContainer');
            chatMessage.innerHTML = ""
            response.forEach(element => {
                this.renderMessage(element);
            });
        }
        )
    },
    renderMessage(message) {
        const chatMessage = document.getElementById('messageContainer');
        const mine = message.author == this.author ? "own" : null;
        const htmlString = `
        <div class="messageItem ${mine}">
            <div class="header">
                <span class="author">${message.author}</span>
                <span class="time">${new Date(message.created_at).getHours()}:${new Date(message.created_at).getMinutes()}</span>
            </div>
            <p>
                ${message.message}
            </p>
        </div>`;
        chatMessage.insertAdjacentHTML("beforeend", htmlString);
    }

}

chat.init();