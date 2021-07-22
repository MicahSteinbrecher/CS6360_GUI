# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/contact_list'
db = SQLAlchemy(app)

@app.route("/")
def hello_world():
    result = db.engine.execute("SELECT * FROM contact")



# See PyCharm help at https://www.jetbrains.com/help/pycharm/
