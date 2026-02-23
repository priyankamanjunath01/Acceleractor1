# AI Text Assistant

A full-stack web application that allows users to input text and receive AI-generated responses for summarization, writing improvement, and simplified explanations.

## Features

- **Text Summarization**: Get concise summaries of long texts
- **Writing Improvement**: Enhance clarity, professionalism, and structure
- **Simple Explanations**: Break down complex concepts into easy-to-understand language

## Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Backend**: Node.js with Express
- **AI API**: OpenAI (configurable for other providers)

## Project Structure

```
.
├── backend/          # Express API server
│   ├── server.js     # Main server file
│   ├── ai-service.js # AI API integration
│   └── package.json
├── frontend/         # Next.js application
│   ├── app/          # Next.js app directory
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (or other AI API key)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-3.5-turbo
   PORT=3001
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (copy from `.env.local.example`):
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` if your backend runs on a different port:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your text in the text input box
2. Select an action:
   - **Summarize**: Get a concise summary
   - **Improve Writing**: Enhance clarity and professionalism
   - **Explain Simply**: Break down complex concepts
3. Click "Process Text"
4. View the AI-generated response
5. Click "Clear & Start Over" to reset

## API Endpoints

### POST `/api/process-text`

Process text with AI based on the selected action.

**Request Body:**
```json
{
  "text": "Your text here",
  "action": "summarize" | "improve" | "explain"
}
```

**Response:**
```json
{
  "success": true,
  "result": "AI-generated response",
  "action": "summarize"
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Text Assistant API is running"
}
```

## Configuration

### Using Different AI Providers

To use a different AI provider (e.g., Anthropic Claude, Google Gemini), modify `backend/ai-service.js`:

1. Install the provider's SDK
2. Update the `processTextRequest` function to use the new provider
3. Update environment variables accordingly

### Changing Models

Edit the `OPENAI_MODEL` in `backend/.env`:
- `gpt-3.5-turbo` (default, cost-effective)
- `gpt-4` (more capable, higher cost)
- `gpt-4-turbo-preview` (latest features)

## Troubleshooting

### Backend Issues

- **"OPENAI_API_KEY is not configured"**: Make sure your `.env` file exists and contains a valid API key
- **Port already in use**: Change the `PORT` in `.env` to a different port

### Frontend Issues

- **Cannot connect to backend**: Verify `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
- **CORS errors**: Ensure the backend CORS middleware is configured correctly

## Development

### Backend Development

- Run in watch mode: `npm run dev`
- The server auto-reloads on file changes

### Frontend Development

- Run in development mode: `npm run dev`
- Hot reloading is enabled by default
- Build for production: `npm run build`
- Start production server: `npm start`

## License

MIT
