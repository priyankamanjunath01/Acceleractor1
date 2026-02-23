import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processTextRequest } from './ai-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Text Assistant API is running' });
});

// Main API endpoint
app.post('/api/process-text', async (req, res) => {
  try {
    const { text, action } = req.body;

    // Validate input
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    if (!action || !['summarize', 'improve', 'explain'].includes(action)) {
      return res.status(400).json({ error: 'Valid action is required (summarize, improve, explain)' });
    }

    // Process the text with AI
    const result = await processTextRequest(text, action);

    res.json({ 
      success: true,
      result: result,
      action: action
    });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ 
      error: 'Failed to process text',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
