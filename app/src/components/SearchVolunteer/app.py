from flask import Flask, request, jsonify
import numpy as np
from transformers import BertTokenizer, BertModel
from sklearn.ensemble import RandomForestClassifier
import joblib
import warnings
from flask import Flask, render_template, request
from flask_cors import CORS  # Import CORS
warnings.filterwarnings('ignore')

# Initialize Flask app
app = Flask(__name__)

CORS(app)  # Add this line here

# Load the trained model and tokenizer
def load_model_and_tokenizer():
    model = joblib.load(r'src\components\SearchVolunteer\more_accurate_rf_classifier (1).pkl')  # Load RandomForestClassifier
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')  # Load BERT tokenizer
    bert_model = BertModel.from_pretrained('bert-base-uncased')  # Load BERT model
    return model, tokenizer, bert_model

# Get BERT embeddings for input text
def get_bert_embeddings(text, tokenizer, bert_model):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=128)
    outputs = bert_model(**inputs)
    return outputs.pooler_output.squeeze().detach().numpy()

# Load model and tokenizer globally
model, tokenizer, bert_model = load_model_and_tokenizer()

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message', '').strip()

    if not message:
        return jsonify({"error": "Message cannot be empty"}), 400

    try:
        # Get BERT embeddings
        embedding = get_bert_embeddings(message, tokenizer, bert_model).reshape(1, -1)
        prediction = model.predict(embedding)
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    # Map prediction to urgency levels
    urgency_map = {
        'low': 'Low to Medium',
        'medium': 'Medium',
        'high': 'Medium to High'
    }
    normalized_prediction = prediction[0].lower()
    urgency = urgency_map.get(normalized_prediction, "Unknown urgency level")

    return jsonify({"message": message, "urgency": urgency})

if __name__ == '__main__':
    app.run(debug=True)
