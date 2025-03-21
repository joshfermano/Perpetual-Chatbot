import { model } from '../config/Gemini.js';
import { chatHistory, systemPrompt } from '../config/chatHistory.js';

// Store chat history for each user session (simple in-memory storage)
const sessions = new Map();

export const generateResponse = async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create session history
    if (!sessions.has(sessionId)) {
      // Initialize with our pre-trained history
      // Note: First message must be from 'user' according to Gemini API requirements
      const initializedHistory = [
        // First add a system context message as a user message
        {
          role: 'user',
          parts: [
            { text: 'Initialize the chat with your university assistant role' },
          ],
        },
        // Then add the system response that defines the assistant's role
        {
          role: 'model',
          parts: [{ text: systemPrompt }],
        },
        // Then include the rest of the chat history
        ...chatHistory,
      ];
      sessions.set(sessionId, initializedHistory);
    }

    const history = sessions.get(sessionId);

    // Add user message to history
    history.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Create a chat session with the history
    const chat = model.startChat({
      history: history.slice(0, -1), // Use history except the last user message
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Send the user's message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Add AI response to history
    history.push({
      role: 'model',
      parts: [{ text }],
    });

    // Keep history at a reasonable size
    if (history.length > 20) {
      // Always keep the first two messages (system context) and last 18 messages
      const preservedStart = history.slice(0, 2); // Initial user message and system prompt
      const preservedEnd = history.slice(-18); // Most recent conversation
      sessions.set(sessionId, [...preservedStart, ...preservedEnd]);
    }

    return res.status(200).json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate response',
    });
  }
};
