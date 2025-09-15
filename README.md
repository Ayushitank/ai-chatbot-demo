# 🤖 Redlio Designs Database-Powered Chatbot

A specialized chatbot for Redlio Designs website (https://redliodesigns.com) built with Next.js. This chatbot connects to your Supabase database, scans all tables, and provides intelligent responses based on your actual data with AI fallback.

## Features

- 🗄️ **Database-Powered** - Connects to Supabase and scans all tables for real data
- 🎯 **Redlio Designs Focused** - Specialized responses about Redlio Designs services and company
- 🔍 **Intelligent Scanning** - Automatically categorizes and searches through your database content
- 🧠 **Smart Responses** - Provides responses based on actual database content
- 🤖 **AI Fallback** - Uses OpenRouter API for complex questions when no database match
- 💬 **Real-time Chat** - Interactive chat interface with Redlio Designs branding
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 📊 **Multi-Table Support** - Works with services, projects, team, testimonials, blog, FAQ, and more

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase database:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create tables for your content (services, projects, team, testimonials, blog, faq, contact, etc.)
   - Get your project URL and anon key from the Supabase dashboard

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   Get your free API key from [OpenRouter](https://openrouter.ai/)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the chatbot in action!

## How It Works

The chatbot uses a comprehensive database-driven approach:

1. **Database Scanning**: First connects to your Supabase database and scans all tables:
   - `services` - Your service offerings
   - `projects`/`portfolio` - Your project portfolio
   - `team`/`staff` - Team member information
   - `testimonials`/`reviews` - Client feedback
   - `blog`/`articles`/`posts` - Blog content
   - `faq` - Frequently asked questions
   - `contact`/`company_info` - Contact details
   - And many more...

2. **Intelligent Categorization**: Automatically categorizes data based on table names and content

3. **Smart Search**: Performs full-text search across all database content to find relevant information

4. **Formatted Responses**: Formats database content into user-friendly responses

5. **AI Fallback**: If no database match is found, uses OpenRouter API with Google's Gemini model

## API Endpoints

- `POST /api/chat` - Main chat endpoint that processes user messages

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
