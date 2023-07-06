from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:(Savo)2000@database-1.cuaqfhxi9wg7.us-east-1.rds.amazonaws.com:5432/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)

ma = Marshmallow(app)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

class ArticleShema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_shema = ArticleShema()
articles_shema = ArticleShema(many=True)

@app.route('/get', methods=['GET'])
def get_articles():
    allArticles = Article.query.all()
    results = articles_shema.dump(allArticles)
    return jsonify(results)

@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Article.query.get(id)
    return article_shema.jsonify(article)

@app.route('/add', methods=['POST'])
def addArticle():
    title = request.json['title']
    body = request.json['body']

    articles = Article(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_shema.jsonify(articles)

@app.route('/update/<id>/', methods=['PUT'])
def updateArticle(id):
    article = Article.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return article_shema.jsonify(article)
    
@app.route('/delete/<id>/', methods=['DELETE'])
def deleteArticle(id):
     article = Article.query.get(id)

     db.session.delete(article)
     db.session.commit()

     return article_shema.jsonify(article)
     

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)