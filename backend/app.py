from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime 

from datetime import datetime
import os

app = Flask(__name__)


    cursor = conn.cursor()

            i
            code TEXT NOT NULL,
            description TEXT,
            cat

            up
    ''')
    conn.commit()

def 

def get_snippets():
        conn = get_db()
        cursor.execute('SELECT *
        conn.close()
        snippets = []
            snippet = dict(ro
                snippe
                snippet['p
        
    except Exception as e:

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
        
        conn = get_db()
        preview_params_json = 
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
            UPDATE snippets
        
            data['title
            data['language'],
            tags_json,
            data.get('component
            data['up
        
        conn.commit
        
        
        return jsonify(data
        return jsonify({'error'
@app.route('/api/snippets/<snippet_id>', methods=['DELETE
    try:
        cursor = conn.cursor()
        
        
            return jsonify
        return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0













































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
    app.run(host='0.0.0.0', port=5000, debug=True)
