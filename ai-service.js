import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client lazily (ensure key is present)
if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. AI requests will fail until configured.');
}

// Instantiate OpenAI client lazily to avoid throwing at startup when key is missing
let openai;
function getOpenAIClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      // keep openai undefined; callers should check API key first
      return undefined;
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

// Action-specific prompts
const PROMPTS = {
  summarize: (text) => `Please provide a concise summary of the following text:\n\n${text}`,
  
  improve: (text) => `Please improve the writing quality of the following text. Make it clearer, more professional, and better structured while preserving the original meaning:\n\n${text}`,
  
  explain: (text) => `Please explain the following text in simple, easy-to-understand language. Break down complex concepts and use everyday examples where possible:\n\n${text}`
};

/**
 * Process text request using AI API
 * @param {string} text - The input text to process
 * @param {string} action - The action to perform (summarize, improve, explain)
 * @returns {Promise<string>} - The AI-generated response
 */
export async function processTextRequest(text, action) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured. Please set it in your .env file.');
    }

    const prompt = PROMPTS[action](text);

    const params = {
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant specialized in text processing. Provide clear, concise, and helpful responses.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    // Get client (instantiated lazily)
    const client = getOpenAIClient();
    if (!client) {
      throw new Error('OPENAI_API_KEY is not configured. Please set it in your .env file.');
    }

    // Support multiple OpenAI client method signatures across SDK versions
    let completion;
    if (client.chat && client.chat.completions && typeof client.chat.completions.create === 'function') {
      completion = await client.chat.completions.create(params);
    } else if (typeof client.createChatCompletion === 'function') {
      completion = await client.createChatCompletion(params);
    } else {
      throw new Error('Installed OpenAI SDK does not support chat completion methods expected by this service.');
    }

    // Normalize response content from different SDK shapes
    const content = (
      completion?.choices?.[0]?.message?.content ||
      completion?.choices?.[0]?.text ||
      completion?.data?.choices?.[0]?.message?.content ||
      completion?.data?.choices?.[0]?.text
    );

    if (!content) throw new Error('No content returned from OpenAI');

    return String(content).trim();
  } catch (error) {
    console.error('AI API Error:', error);
    
    // Provide fallback response if API fails
    if (error.message && error.message.includes('API key')) {
      throw error;
    }

    throw new Error(`AI processing failed: ${error?.message || String(error)}`);
  }
}
