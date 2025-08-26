# SDLC AI Assistant

An AI-powered Software Development Life Cycle assistant with specialized agents for Product Owners, Developers, Scrum Masters, and Testers. Features seamless Jira integration and intelligent content generation.

## 🚀 Features

- **4 Specialized AI Agents**:
  - **Product Owner**: Epic and user story creation, business requirement analysis
  - **Developer**: Task breakdown, technical documentation, code planning
  - **Scrum Master**: Board creation, sprint planning, tracking activities
  - **Tester**: Test case generation, quality assurance planning

- **Jira Integration**: Direct integration for creating and managing tickets
- **Context-Aware**: Leverages historical data and document attachments
- **Memory Retention**: Agents maintain context across conversations
- **Template-Based**: Uses historical datasets for better content generation

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Python FastAPI
- **LLM Integration**: AI content generation with context awareness
- **Infrastructure**: AWS Cloud
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite

## 📋 Prerequisites

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## 🔧 Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd sdlc-ai-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
The application will be available at `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Common Issues on Windows

1. **Port 8080 already in use**
   - Vite will automatically find the next available port
   - Check the terminal output for the actual port being used

2. **Node.js version issues**
   - Ensure you have Node.js 16 or higher installed
   - Check version: `node --version`

3. **Installation problems**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

4. **Permission errors**
   - Run terminal as Administrator on Windows
   - Or use `npx` prefix for commands

## 🔗 Integration Setup

### Backend API Connection
The frontend is designed to connect with a Python FastAPI backend. Configure the API endpoints in your environment variables.

### Jira Integration
Set up Jira API credentials for seamless ticket creation and management.

### LLM Services
Configure your preferred LLM provider for AI agent functionality.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── AgentCard.tsx   # Individual agent cards
│   ├── AgentDashboard.tsx # Main dashboard
│   ├── ChatInterface.tsx  # Chat functionality
│   └── Header.tsx      # App header
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🎨 Design System

The application uses a comprehensive design system with:
- Tailwind CSS for styling
- Custom color tokens and themes
- Responsive design patterns
- Dark/light mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions, please refer to the project documentation or create an issue in the repository.