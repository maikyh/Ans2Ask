from flask import Flask, request, jsonify
from flask_cors import CORS

import nltk
import string
from sklearn.feature_extraction.text import TfidfVectorizer

import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download()

app = Flask(__name__)
CORS(app)

stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)

def stem_tokens(tokens):
    return [stemmer.stem(item) for item in tokens]

def normalize(text):
    return stem_tokens(nltk.word_tokenize(text.lower().translate(remove_punctuation_map)))

vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')

def cosine_sim(text1, text2):
    tfidf = vectorizer.fit_transform([text1, text2])
    return ((tfidf * tfidf.T).A)[0, 1]

@app.route('/check_similarity', methods=['POST'])
def check_similarity():
    data = request.json

    sent_1 = data['sent_1']
    sent_2 = data['sent_2']

    return jsonify({'result': cosine_sim(sent_1, sent_2)})

if __name__ == '__main__':
    app.run()
