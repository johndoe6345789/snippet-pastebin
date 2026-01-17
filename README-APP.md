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

CodeSnippet offers flexible data storage with two backend options:

### Storage Backends

#### 1. **IndexedDB (Local Browser Storage)** - Default
- All data stored locally in your browser
- No server required
- Data persists on this device only
- Uses SQLite compiled to WebAssembly for full SQL capabilities
- Primary: IndexedDB for better performance and larger storage capacity (typically 50MB+)
- Fallback: localStorage when IndexedDB is unavailable (typically 5-10MB limit)

#### 2. **Flask Backend (Remote Server)** - Optional
- Snippets stored on a remote Flask server with SQLite database
- Access your snippets from any device
- Requires running the Flask backend (see Backend Setup below)
- Supports data migration between IndexedDB and Flask

### Switching Storage Backends

Visit the **Settings** page to:
- Choose between IndexedDB and Flask backend
- Configure Flask backend URL
- Test connection to Flask server
- Migrate data between storage backends
- View database statistics
- Export/import database backups

## Backend Setup

### Running Flask Backend Locally

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Server runs on `http://localhost:5000` by default.

### Running with Docker

Build and run:
```bash
docker build -t codesnippet-backend ./backend
docker run -p 5000:5000 -v $(pwd)/data:/data codesnippet-backend
```

Or use docker-compose:
```bash
docker-compose up -d
```

### Backend API

The Flask backend provides a REST API:
- `GET /health` - Health check
- `GET /api/snippets` - Get all snippets
- `GET /api/snippets/:id` - Get a specific snippet
- `POST /api/snippets` - Create a new snippet
- `PUT /api/snippets/:id` - Update a snippet
- `DELETE /api/snippets/:id` - Delete a snippet

See `backend/README.md` for more details.

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
