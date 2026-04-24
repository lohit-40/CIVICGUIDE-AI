require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        const { message, contextStep } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key is not configured.' });
        }
        
        const apiKey = process.env.GEMINI_API_KEY;
        // Using Gemini 2.5 Flash for speed and cost-efficiency
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const promptText = `You are CivicGuide AI, a helpful, non-partisan Election Process Education assistant.
The user is currently viewing the step: "${contextStep}" of the election timeline.
Provide a concise, easy-to-understand response focused on this context. Be conversational and highly accurate.
User Query: ${message}`;

        const requestBody = {
            contents: [{ parts: [{ text: promptText }] }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error details:", errorData);
            return res.status(response.status).json({ error: 'Failed to fetch from Gemini API.' });
        }

        const data = await response.json();
        
        let responseText = "I'm sorry, I couldn't process that request.";
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            responseText = data.candidates[0].content.parts[0].text;
        }

        res.json({ reply: responseText });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
