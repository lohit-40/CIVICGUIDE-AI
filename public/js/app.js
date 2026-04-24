document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contextBanner = document.getElementById('context-banner');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let currentContext = "Voter Registration";

    // Handle Timeline Clicks
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update UI
            timelineItems.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');

            // Update Context
            currentContext = item.getAttribute('data-step');
            contextBanner.innerHTML = `Current Context: <strong>${currentContext}</strong>`;
            
            // Add a context switch message to the chat
            addMessage(`Switched focus to <strong>${currentContext}</strong>. What would you like to know about this step?`, 'assistant-msg');
        });
    });

    // Handle Chat Submit
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        addMessage(message, 'user-msg');
        userInput.value = '';
        
        // Disable input while fetching
        userInput.disabled = true;
        sendBtn.disabled = true;

        // Show typing indicator
        const typingId = addTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, contextStep: currentContext })
            });

            removeTypingIndicator(typingId);

            if (!response.ok) {
                const errorData = await response.json();
                addMessage(errorData.error || "An error occurred while fetching the response.", 'assistant-msg');
                return;
            }

            const data = await response.json();
            // Convert markdown-like syntax to basic HTML for chat
            const formattedReply = formatMarkdown(data.reply);
            addMessage(formattedReply, 'assistant-msg', true);
        } catch (error) {
            removeTypingIndicator(typingId);
            addMessage("Unable to connect to the server. Please ensure the backend is running.", 'assistant-msg');
        } finally {
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        }
    });

    function addMessage(text, className, isHtml = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        
        if (isHtml) {
            msgDiv.innerHTML = text;
        } else {
            const p = document.createElement('p');
            p.innerHTML = text; // allow bold tags for internal messages
            msgDiv.appendChild(p);
        }

        chatWindow.appendChild(msgDiv);
        scrollToBottom();
    }

    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message assistant-msg typing-indicator`;
        msgDiv.id = id;
        msgDiv.textContent = "CivicGuide AI is typing...";
        chatWindow.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Basic markdown to HTML converter for chat responses
    function formatMarkdown(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/\n/g, '<br>');
        return `<p>${formatted}</p>`;
    }
});
