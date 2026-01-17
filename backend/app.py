from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import json
import os

app = Flask(__name__)

ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '*')
if ALLOWED_ORIGINS == '*':
    CORS(app, 
         origins='*',
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=['Content-Type', 'Authorization'],
         supports_credentials=False)
else:
    origins_list = [origin.strip() for origin in ALLOWED_ORIGINS.split(',')]
    CORS(app, 
         origins=origins_list,
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=['Content-Type', 'Authorization'],
         supports_credentials=True)

DATABASE_PATH = os.environ.get('DATABASE_PATH', '/app/data/snippets.db')
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)

def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS snippets (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            code TEXT NOT NULL,
            language TEXT NOT NULL,
            description TEXT,
            tags TEXT,
            category TEXT DEFAULT 'general',
            componentName TEXT,
            previewParams TEXT,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

@app.route('/api/snippets', methods=['GET'])
def get_snippets():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM snippets ORDER BY updatedAt DESC')
        rows = cursor.fetchall()
        conn.close()
        
        snippets = []
        for row in rows:
            snippet = dict(row)
            if snippet.get('tags'):
                snippet['tags'] = json.loads(snippet['tags'])
            if snippet.get('previewParams'):
                snippet['previewParams'] = json.loads(snippet['previewParams'])
            snippets.append(snippet)
        
        return jsonify(snippets)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/snippets/<snippet_id>', methods=['GET'])
def get_snippet(snippet_id):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM snippets WHERE id = ?', (snippet_id,))
        row = cursor.fetchone()
        conn.close()
        
        if not row:
            return jsonify({'error': 'Snippet not found'}), 404
        
        snippet = dict(row)
        if snippet.get('tags'):
            snippet['tags'] = json.loads(snippet['tags'])
        if snippet.get('previewParams'):
            snippet['previewParams'] = json.loads(snippet['previewParams'])
        
        return jsonify(snippet)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/snippets', methods=['POST'])
def create_snippet():
    try:
        data = request.json
        conn = get_db()
        cursor = conn.cursor()
        
        tags_json = json.dumps(data.get('tags', []))
        preview_params_json = json.dumps(data.get('previewParams', {}))
        
        cursor.execute('''
            INSERT INTO snippets (id, title, code, language, description, tags, category, componentName, previewParams, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id'],
            data['title'],
            data['code'],
            data['language'],
            data.get('description', ''),
            tags_json,
            data.get('category', 'general'),
            data.get('componentName', ''),
            preview_params_json,
            data['createdAt'],
            data['updatedAt']
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/snippets/<snippet_id>', methods=['PUT'])
def update_snippet(snippet_id):
    try:
        data = request.json
        conn = get_db()
        cursor = conn.cursor()
        
        tags_json = json.dumps(data.get('tags', []))
        preview_params_json = json.dumps(data.get('previewParams', {}))
        
        cursor.execute('''
            UPDATE snippets
            SET title = ?, code = ?, language = ?, description = ?, tags = ?, category = ?, componentName = ?, previewParams = ?, updatedAt = ?
            WHERE id = ?
        ''', (
            data['title'],
            data['code'],
            data['language'],
            data.get('description', ''),
            tags_json,
            data.get('category', 'general'),
            data.get('componentName', ''),
            preview_params_json,
            data['updatedAt'],
            snippet_id
        ))
        
        conn.commit()
        conn.close()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Snippet not found'}), 404
        
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/snippets/<snippet_id>', methods=['DELETE'])
def delete_snippet(snippet_id):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM snippets WHERE id = ?', (snippet_id,))
        conn.commit()
        conn.close()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Snippet not found'}), 404
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=False)
