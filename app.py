"""
Flask web application for Collapp - Photo Collage Maker.
Serves the frontend and provides API endpoints for image upload and collage generation.
"""

import os
import uuid
import tempfile
import atexit
import shutil

from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
from collage.renderer import compose_collage
from config import DEFAULT_OUTPUT_SIZE

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Upload folder (temporary)
# ---------------------------------------------------------------------------
UPLOAD_FOLDER = os.path.join(tempfile.gettempdir(), 'collapp_uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB limit

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp', '.gif'}


def _cleanup_uploads():
    """Remove temporary upload folder on exit."""
    try:
        shutil.rmtree(UPLOAD_FOLDER, ignore_errors=True)
    except Exception:
        pass


atexit.register(_cleanup_uploads)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route('/')
def index():
    """Serve the main application page."""
    return render_template(
        'index.html',
        default_width=DEFAULT_OUTPUT_SIZE[0],
        default_height=DEFAULT_OUTPUT_SIZE[1],
    )


@app.route('/api/upload', methods=['POST'])
def upload_image():
    """Upload an image and return its server filename + URL."""
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return jsonify({'error': f'Unsupported format. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

    filename = f'{uuid.uuid4().hex}{ext}'
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    return jsonify({
        'filename': filename,
        'url': f'/uploads/{filename}',
    })


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve an uploaded image."""
    # Basic safety: prevent path traversal
    safe_name = os.path.basename(filename)
    return send_from_directory(UPLOAD_FOLDER, safe_name)


@app.route('/api/generate', methods=['POST'])
def generate_collage():
    """Generate and download the final collage image."""
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Invalid JSON body'}), 400

    filenames = data.get('images', [])
    positions = data.get('positions', [])
    output_w = int(data.get('width', DEFAULT_OUTPUT_SIZE[0]))
    output_h = int(data.get('height', DEFAULT_OUTPUT_SIZE[1]))
    output_size = (output_w, output_h)

    if not filenames or len(filenames) != len(positions):
        return jsonify({'error': 'Images and positions count mismatch'}), 400

    # Resolve full paths and validate
    image_paths = []
    for fn in filenames:
        safe_name = os.path.basename(fn)
        path = os.path.join(UPLOAD_FOLDER, safe_name)
        if not os.path.isfile(path):
            return jsonify({'error': f'Image not found: {fn}'}), 404
        image_paths.append(path)

    pos_tuples = [(int(p[0]), int(p[1]), int(p[2]), int(p[3])) for p in positions]

    try:
        collage = compose_collage(image_paths, pos_tuples, output_size)
    except Exception as e:
        return jsonify({'error': f'Failed to generate collage: {e}'}), 500

    output_filename = f'collage_{uuid.uuid4().hex}.jpg'
    output_path = os.path.join(UPLOAD_FOLDER, output_filename)
    collage.save(output_path, 'JPEG', quality=95)

    return send_file(
        output_path,
        mimetype='image/jpeg',
        as_attachment=True,
        download_name='collage.jpg',
    )


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)