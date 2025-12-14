# Ollama Setup Guide (Free Local LLM)

## What is Ollama?
- Free, open-source LLM framework
- Run models locally (no API costs)
- Perfect for hackathons
- Supports Mistral 7B, Llama 2, and more

## Installation

### macOS
```bash
# Download from https://ollama.ai
# Or use Homebrew
brew install ollama
```

### Linux
```bash
curl https://ollama.ai/install.sh | sh
```

### Windows
Download from https://ollama.ai/download

## Quick Start

### 1. Start Ollama
```bash
ollama serve
```

### 2. Pull Mistral 7B (in another terminal)
```bash
ollama pull mistral
```

### 3. Test it
```bash
ollama run mistral "Hello, how are you?"
```

## Integration with Backend

### API Endpoint
```
http://localhost:11434/api/generate
```

### Example Request
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "Generate feedback for this code...",
  "stream": false
}'
```

## Node.js Integration

```typescript
import axios from 'axios'

async function generateFeedback(code: string) {
  const response = await axios.post(
    'http://localhost:11434/api/generate',
    {
      model: 'mistral',
      prompt: `Analyze this code and provide feedback:\n${code}`,
      stream: false,
    }
  )
  return response.data.response
}
```

## Models Available

- **mistral** (7B) - Fast, good quality
- **llama2** (7B) - Good for chat
- **neural-chat** (7B) - Optimized for chat
- **orca-mini** (3B) - Lightweight

## Performance

- Mistral 7B: ~5-10 seconds per response
- Runs on CPU (no GPU needed)
- ~4GB RAM required
- Perfect for demo

## Cost
**$0** - Completely free!

## Troubleshooting

### Port already in use
```bash
ollama serve --port 11435
```

### Out of memory
Use smaller model:
```bash
ollama pull orca-mini
```

### Slow responses
- Use CPU-only mode
- Reduce prompt length
- Use smaller model

## For Hackathon

1. Install Ollama
2. Pull mistral model
3. Start ollama serve
4. Integrate with backend
5. Demo with real AI responses

**Total setup time: 5 minutes**
