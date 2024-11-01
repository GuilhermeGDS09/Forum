from flask import Flask, render_template, request, jsonify
from google.cloud import firestore

app = Flask(__name__)

# Inicializa o cliente do Firestore
db = firestore.Client()

@app.route('/')
def index():
    # Recupera mensagens do Firestore
    messages_ref = db.collection('messages')
    messages = messages_ref.stream()
    return render_template('index.html', messages=[msg.to_dict() for msg in messages])

@app.route('/add_message', methods=['POST'])
def add_message():
    content = request.form.get('content')
    db.collection('messages').add({'content': content})
    return jsonify({'content': content})

if __name__ == '__main__':
    app.run(debug=True)
