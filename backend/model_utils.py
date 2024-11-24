import torch
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import DataLoader, TensorDataset
import re
from nltk.corpus import stopwords
import nltk
import warnings

warnings.filterwarnings("ignore")

# Download stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Text preprocessing (This functionw as used to preprocess the text data before training the model)
def clean_text(text):
    text = re.sub(r'[^\w\s]', '', text)  # keeps only words and whitespace 
    words = text.split() 
    words = [word.lower() for word in words if word.isalpha()]
    words = [word for word in words if word not in stop_words]  
    return ' '.join(words)

# Loading the model, tokenizer and its weights for bert base uncased model
def load_model_and_tokenizer_base(tokenizer_name='bert-base-uncased', weights_path='assets\\bert_base_uncased_4.pth'):

    tokenizer = BertTokenizer.from_pretrained(tokenizer_name, do_lower_case=True, padding=True, truncation=True, max_length=128)
    
    model = BertForSequenceClassification.from_pretrained(tokenizer_name, num_labels=2) 
    # Loading the weights    
    model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) 
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    
    model.eval()

    return model, tokenizer, device

# Loading the model, tokenizer and its weights for bert large uncased model
def load_model_and_tokenizer_large(tokenizer_name='bert-large-uncased', weights_path='assets\\bert_large_uncased_3.pth'):

    tokenizer = BertTokenizer.from_pretrained(tokenizer_name, do_lower_case=True, padding=True, truncation=True, max_length=128)
    
    model = BertForSequenceClassification.from_pretrained(tokenizer_name, num_labels=2) 
    # Loading the weights    
    model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) 
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    
    model.eval()

    return model, tokenizer, device

# Preprocessing and creating input tensors for the model
def preprocess_and_tokenize(texts, tokenizer):
    cleaned_texts = [clean_text(text) for text in texts]
    inputs = tokenizer(cleaned_texts, padding=True, truncation=True, return_tensors='pt', max_length=128)
    return inputs

import torch
import torch.nn.functional as F

def make_prediction(model, inputs, device):
    with torch.no_grad():
        input_ids = inputs['input_ids'].to(device)
        attention_mask = inputs['attention_mask'].to(device)
        
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        
        probabilities = F.softmax(logits, dim=-1).cpu().numpy()
        
        prediction = torch.argmax(logits, dim=1).cpu().numpy()

    return prediction[0], probabilities[0]


def calculate_percentages(predictions):
    ai_written_count = predictions.count(1)
    total_count = len(predictions)
    
    ai_written_percentage = (ai_written_count / total_count) * 100 if total_count > 0 else 0
    human_written_percentage = 100 - ai_written_percentage
    
    return ai_written_percentage, human_written_percentage