# Cosmic Oracle - AI Astrologer Chatbot

![Cosmic Oracle](/public/zodiac-wheel.svg)

## Overview

Cosmic Oracle is an AI-powered astrology chatbot that connects you with the wisdom of the stars. This application uses advanced AI models to provide personalized astrological insights, cosmic guidance, and mystical wisdom.

## Features

- **Multiple AI Models**: Choose between three powerful AI backends:
  - **Groq ✨**: Fast and efficient AI responses
  - **OpenRouter 🌌**: Access to a variety of large language models
  - **Gemini 🔮**: Google's advanced AI technology

- **Mystical UI**: Immersive cosmic-themed interface with zodiac symbols, celestial imagery, and magical elements

- **Responsive Design**: Works beautifully on desktop and mobile devices

- **Markdown Support**: Rich text formatting in AI responses for better readability

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- API keys for the AI services you want to use:
  - Groq API key
  - OpenRouter API key
  - Gemini API key

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd astro-ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   GROQ_API_KEY=your_groq_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select your preferred AI model from the dropdown menu
2. Type your question about astrology, tarot, or cosmic guidance
3. Receive mystical insights from the AI astrologer

## Technology Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: CSS Modules
- **AI Integration**: API routes for Groq, OpenRouter, and Gemini
- **Text Rendering**: ReactMarkdown for rich text formatting

## Customization

You can customize the system prompt for each AI model by modifying the respective API route files in `src/app/api/`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Cosmic imagery and zodiac designs
- Next.js team for the amazing framework
- AI providers for their powerful language models

---

*"The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." - Carl Sagan*
