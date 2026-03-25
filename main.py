from app import app

if __name__ == '__main__':
    print("Starting Collage Maker API on http://localhost:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)