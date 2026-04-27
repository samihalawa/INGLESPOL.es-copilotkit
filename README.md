# INGLESPOL CopilotKit State Machine Demo

A course selling application for INGLESPOL English academy built with CopilotKit and Gemini 2.0 Flash, demonstrating a multi-stage conversational AI workflow for selling English courses for Spanish civil service exams.

## Features

- **State Machine Architecture**: Six-stage course selling process with CopilotKit integration
- **Custom AI Model**: Powered by Gemini 2.0 Flash for enhanced conversational abilities
- **Interactive UI**: Real-time state visualization and enrollment management
- **INGLESPOL Integration**: Authentic branding and methodology from Spain's leading civil service English academy
- **Responsive Design**: Built with Next.js 14 and Tailwind CSS

## Stages

1. **Contact Information** - Collect student details and exam type
2. **Needs Assessment** - Evaluate English level and requirements
3. **Course Selection** - Present appropriate course packages
4. **Course Customization** - Personalize schedule and preferences
5. **Payment Details** - Configure payment method and plan
6. **Enrollment Confirmation** - Finalize course enrollment

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

The application uses CopilotKit's state machine pattern to create a guided course selling flow. Each stage is implemented as a custom hook that manages its own state and transitions, while the global state provider maintains the overall enrollment state. The system follows INGLESPOL's proven methodology for helping Spanish civil service candidates achieve 18+ points in English exams.