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
removePunctuationMap = dict((ord(char), None) for char in string.punctuation)

def stemTokens(tokens):
    return [stemmer.stem(item) for item in tokens]

def normalize(text):
    return stemTokens(nltk.word_tokenize(text.lower().translate(removePunctuationMap)))

vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')

def cosineSim(text1, text2):
    tfidf = vectorizer.fit_transform([text1, text2])
    return ((tfidf * tfidf.T).A)[0, 1]

@app.route('/checkCosineSimilarity', methods=['POST'])
def checkCosineSimilarity():
    data = request.json

    sentence1 = data['sentence1']
    sentence2 = data['sentence2']

    return jsonify({'result': cosineSim(sentence1, sentence2)})

if __name__ == '__main__':
    app.run()
