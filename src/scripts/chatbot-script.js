const form = document.getElementById('input-form');
const input = document.getElementById('input');
const messagesContainer = document.getElementById('messages');

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const messageText = input.value.trim();
    if (!messageText) return;
    appendMessage(messageText, 'user');
    input.value = '';

    // Example AI response; replace with actual API call
    setTimeout(() => {
        appendMessage('This is a simulated AI response.', 'ai');
    }, 500);
});