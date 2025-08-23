# Dev Notes Pad

> Your personal code assistant - Advanced developer knowledge management system with AI integration

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 Overview

Dev Notes Pad is a comprehensive developer knowledge management system designed to streamline your coding workflow. Built with modern React and featuring a clean, minimalist interface, it helps developers organize code snippets, track errors, and leverage AI-powered features for enhanced productivity.

## ✨ Features

### 📝 Core Note Management
- **Multi-type Notes**: Create snippets, tutorials, tools, and project documentation
- **Advanced Search**: Search across titles, content, and tags with real-time filtering
- **Tag System**: Organize notes with custom tags and filtering capabilities
- **Local Storage**: Persistent data storage in your browser

### 🚨 Error Logging System
- **Structured Error Tracking**: Log errors with titles, messages, and stack traces
- **Solution Documentation**: Link errors to their fixes and related notes
- **Context Tracking**: Associate errors with specific files, components, and projects
- **Historical Analysis**: Build a comprehensive troubleshooting knowledge base

### 🤖 AI-Powered Features (Coming Soon)
- **OpenAI Integration**: Ready for GPT-4 powered features
- **Code Review**: AI-powered code analysis and suggestions
- **Auto Documentation**: Generate documentation from code snippets
- **Neural Search**: Vector-based semantic search capabilities

### 🎨 Modern User Experience
- **Clean Interface**: Black, gray, and white theme for reduced eye strain
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Tabbed Interface**: Organized switching between notes and error logs
- **Modal Forms**: Intuitive creation and editing workflows

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks and Context API
- **Styling**: Custom CSS with CSS Variables and Flexbox/Grid
- **State Management**: React Context API with useReducer
- **Storage**: Browser Local Storage for data persistence
- **Icons**: Unicode emoji icons for lightweight design
- **Fonts**: Inter, Space Grotesk, and DM Sans for modern typography

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devnotes-pad.git
   cd devnotes-pad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating Notes
1. Click the **"+ New Note"** button in the header
2. Fill in the note details:
   - **Title**: Brief description of your note
   - **Type**: Choose from Code Snippet, Tutorial, Tool, or Project
   - **Language**: Select the programming language
   - **Content**: Add your code or documentation
   - **Tags**: Add relevant tags for organization
3. Click **"Save Note"** to store your note

### Logging Errors
1. Click the **"Log Error"** button in the header
2. Complete the error form:
   - **Error Title**: Brief description of the error
   - **Error Message**: Paste the full error message
   - **Solution/Fix**: Document how you resolved the issue
   - **Stack Trace**: Add the full stack trace (optional)
   - **File/Component**: Specify where the error occurred
   - **Project**: Associate with a specific project
3. Click **"Save Error Log"** to store the error

### Searching and Filtering
- Use the search bar to find notes and errors by content, tags, or titles
- Click the **"Filters"** button for advanced filtering options
- Switch between **Notes** and **Error Logs** tabs to view different content types

### OpenAI Integration
1. Enter your OpenAI API key in the sidebar
2. Click **"Save API Key"** to store it locally
3. AI features will be available once implemented

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Application header
│   ├── Sidebar.js      # OpenAI API key section
│   ├── NotesTab.js     # Notes display component
│   ├── ErrorLogsTab.js # Error logs display
│   ├── CreateNoteModal.js # Note creation modal
│   └── LogErrorModal.js   # Error logging modal
├── context/            # React Context providers
│   ├── NoteContext.js  # Notes state management
│   └── ErrorContext.js # Error logs state management
├── styles/             # Global styles
│   └── global.css      # CSS variables and base styles
├── App.js              # Main application component
├── App.css             # Application-specific styles
└── index.js            # Application entry point
```

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Code Style
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Maintain consistent naming conventions
- Write clean, readable code with proper comments

## 🚧 Roadmap

### Phase 1: Core Features ✅
- [x] Note creation and management
- [x] Error logging system
- [x] Search and filtering
- [x] Local storage persistence
- [x] Responsive design

### Phase 2: Advanced Features 🚧
- [ ] Monaco Editor integration for code editing
- [ ] AI-powered code review and suggestions
- [ ] Knowledge graph visualization
- [ ] GitHub integration
- [ ] Export and sharing capabilities

### Phase 3: AI Enhancement 🚧
- [ ] Neural search with vector embeddings
- [ ] Auto documentation generation
- [ ] RFC and ADR generation
- [ ] Interactive coding challenges
- [ ] Collaborative editing features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **OpenAI** for AI integration capabilities
- **Monaco Editor** for code editing features
- **Inter, Space Grotesk, and DM Sans** font families

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/devnotes-pad/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/devnotes-pad/discussions)
- **Email**: support@devnotes-pad.com

## 🔗 Links

- **Website**: [https://devnotes-pad.com](https://devnotes-pad.com)
- **Documentation**: [https://docs.devnotes-pad.com](https://docs.devnotes-pad.com)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

**Made with ❤️ for developers everywhere**

*Dev Notes Pad - Your personal code assistant*
