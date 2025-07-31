# INGLESPOL CopilotKit State Machine Demo

A car sales application built with CopilotKit and Gemini 2.0 Flash, demonstrating a multi-stage conversational AI workflow.

## Features

- **State Machine Architecture**: Six-stage car sales process with CopilotKit integration
- **Custom AI Model**: Powered by Gemini 2.0 Flash for enhanced conversational abilities
- **Interactive UI**: Real-time state visualization and order management
- **Responsive Design**: Built with Next.js 14 and Tailwind CSS

## Stages

1. **Contact Information** - Collect customer details
2. **Car Selection** - Browse and select vehicles
3. **Financing Options** - Choose between financing and cash payment
4. **Financing Details** - Configure loan terms (if applicable)
5. **Payment Information** - Enter payment details
6. **Order Confirmation** - Review and confirm purchase

## Local Development

1. Clone and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Update .env.local with your Gemini API key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is configured for Cloudflare Pages deployment with the following environment variables:

- `OPENAI_MODEL`: gemini-2.0-flash-exp
- `OPENAI_API_ENDPOINT`: https://generativelanguage.googleapis.com/v1beta/openai/
- `OPENAI_API_KEY`: Your Gemini API key

## Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI Integration**: CopilotKit with custom Gemini 2.0 Flash model
- **State Management**: React Context API
- **Deployment**: Cloudflare Pages

## Architecture

The application uses CopilotKit's state machine pattern to create a guided conversational flow. Each stage is implemented as a custom hook that manages its own state and transitions, while the global state provider maintains the overall application state.