# CodeSnippet - Code Snippet Manager

A powerful code snippet management application with an integrated component library showcase, organized using atomic design principles.

## Features

- 📝 **Snippet Management** - Create, edit, and organize code snippets with syntax highlighting
- 🔍 **Smart Search** - Real-time search across title, description, language, and code content
- 👁️ **Live Preview** - Split-screen editor with live React component preview
- 🗂️ **Component Library** - Showcase components organized by atomic design (Atoms, Molecules, Organisms, Templates)
- 💾 **Local Storage** - All data stored locally in your browser using SQLite (IndexedDB/localStorage)
- 📤 **Export/Import** - Backup and restore your entire snippet database
- 🎨 **Beautiful UI** - Modern dark theme with purple and cyan accents

## Data Storage

CodeSnippet uses a robust local storage solution that works entirely in your browser:

### Storage Strategy
1. **Primary: IndexedDB** - Used when available for better performance and larger storage capacity (typically 50MB+)
2. **Fallback: localStorage** - Used when IndexedDB is unavailable (typically 5-10MB limit)
3. **Technology: SQL.js** - SQLite compiled to WebAssembly for full SQL query capabilities

### Database Structure
- **snippets** table - Stores user-created code snippets with metadata
- **snippet_templates** table - Stores reusable snippet templates

### Features
- ✅ Automatic persistence after every operation
- ✅ Full SQL query capabilities for complex filtering and sorting
- ✅ No external dependencies or server requirements
- ✅ Export/import functionality for backup and transfer
- ✅ Graceful fallback between storage mechanisms
- ✅ Protection against quota exceeded errors

### Managing Your Data

Visit the **Settings** page (accessible from the hamburger menu) to:
- View database statistics (snippet count, template count, storage type, database size)
- Export your database as a backup file
- Import a previously exported database
- Add sample data to get started
- Clear all data if needed

## Getting Started

1. Click "New Snippet" to create your first code snippet
2. Enable "Split-screen preview" for React components to see live previews
3. Use the search bar to quickly find snippets
4. Visit the "Settings" page to manage your data
5. Check out the "Split-Screen Demo" to see the live preview in action

## Technology Stack

- React 19 + TypeScript
- SQL.js (SQLite in WebAssembly)
- Monaco Editor (VS Code editor)
- Framer Motion (animations)
- Shadcn UI (component library)
- Tailwind CSS (styling)
- React Router (navigation)

## License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
