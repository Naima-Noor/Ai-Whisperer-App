from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from docx import Document
import fitz
app = Flask(__name__)
CORS(app)  
from PyPDF2 import PdfReader  
from model_utils import load_model_and_tokenizer_base,load_model_and_tokenizer_large, preprocess_and_tokenize, make_prediction, calculate_percentages


app = Flask(__name__)
CORS(app)

# Load model and tokenizer at startup
# model_path = 'Model_Weights\\bert_base_uncased.pth'  # Path to your fine-tuned model weights
model_base, tokenizer_base, device = load_model_and_tokenizer_base()
model_large, tokenizer_large, _ = load_model_and_tokenizer_large()

print("Both models loaded")

def count_words(text):
    words = re.findall(r'\b\w+\b', text)
    return len(words)

def count_sentences(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', text)
    return len(sentences)


def count_paragraphs(text):
    paragraphs = re.split(r'\n\s*\n+', text.rstrip('\n'))
    return len(paragraphs)


def analyze_text_from_docx(docx_file):
    doc = Document(docx_file)
    text = ''
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    return text

from PyPDF2 import PdfReader
import fitz  # PyMuPDF

def analyze_text_from_pdf(pdf_file):
    text = ''
    try:
        # Try PyPDF2 (PdfReader) for text extraction
        try:
            reader = PdfReader(pdf_file)
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n\n'  # Add double newline for paragraphs
            return text.strip()
        except Exception as e:
            print(f"PyPDF2 failed: {e}")
        
        # Fallback to fitz (PyMuPDF) if PyPDF2 fails
        pdf_document = fitz.open(pdf_file)
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            page_text = page.get_text()
            if page_text:
                text += page_text + '\n\n'  # Add double newline for paragraphs
        pdf_document.close()
        return text.strip()

    except Exception as e:
        print(f"Error processing PDF file: {e}")
        return ''

def analyze_text(content):
    # Split content into sentences
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', content)
    return sentences

@app.route('/analyze', methods=['POST'])
def analyze_text_route():
    text = request.form.get('text')
    file = request.files.get('file')

    if not text and not file:
        return jsonify({"error": "No text or file provided"}), 400

    if text:
        content = text
    elif file:
        if file.filename.endswith('.txt'):
            content = file.read().decode('utf-8')
        elif file.filename.endswith('.docx'):
            content = analyze_text_from_docx(file)
        elif file.filename.endswith('.pdf'):
            content = analyze_text_from_pdf(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

    # Count words, sentences, and paragraphs
    num_words = count_words(content)
    num_sentences = count_sentences(content)
    num_paragraphs = count_paragraphs(content)

    # Analyze sentences for AI detection
    sentences = analyze_text(content)
    predictions_base = []
    predictions_large = []

    # Make prediction using the base model
    predictions_base = []
    probabilities_base = []

    # Make predictions using the base model
    for sentence in sentences:
        inputs = preprocess_and_tokenize([sentence], tokenizer_base)
        prediction_base, prob_base = make_prediction(model_base, inputs, device)
        
        predictions_base.append(int(prediction_base))  # Convert int64 to int
        probabilities_base.append(prob_base)  # Store the probabilities

    print(predictions_base)
    print(probabilities_base)

    predictions_large = []
    probabilities_large = []

    # Make predictions using the large model
    for sentence in sentences:
        inputs = preprocess_and_tokenize([sentence], tokenizer_large)
        prediction_large, prob_large = make_prediction(model_large, inputs, device)
        
        predictions_large.append(int(prediction_large))  # Convert int64 to int
        probabilities_large.append(prob_large)  # Store the probabilities

    print(predictions_large)
    print(probabilities_large)


    ai_written_percentage_base, human_written_percentage_base = calculate_percentages(predictions_base)
    print(f"Base Model - AI-written: {ai_written_percentage_base}%, Human-written: {human_written_percentage_base}%")

    ai_written_percentage_large, human_written_percentage_large = calculate_percentages(predictions_large)
    print(f"Large Model - AI-written: {ai_written_percentage_large}%, Human-written: {human_written_percentage_large}%")

    # Prepare the result
    result = {
        "num_words": num_words,
        "num_sentences": num_sentences,
        "num_paragraphs": num_paragraphs,
        "original_text": content,
        "ai_written_percentage_base": ai_written_percentage_base,
        "predictions_base": predictions_base,
        "predictions_large": predictions_large,
        "ai_written_percentage_large": ai_written_percentage_large,
        "human_written_percentage_base": human_written_percentage_base,
        "human_written_percentage_large": human_written_percentage_large
    }
    print(result)

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
