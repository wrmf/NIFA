from flask import Flask, render_template, request, redirect, url_for, session, Blueprint
import sys
from modules.questions import *
from fileIO import *
from password import password
import pandas as pd
import importlib
import string


TEMPLATES_AUTO_RELOAD = True

MAXQUESTIONS = 10
app = Flask(__name__)

# index page
@app.route("/", methods=[ 'GET', 'POST' ])	# 'GET' and 'POST' are HTML methods that are used in the corresponding html file
def index():
    authenticated = session.get('authenticated', None)
    session['currentQuestion'] = 0  # reset current question counter
    session['numCorrect'] = 0  # reset current question counter
    session['answerString'] = ""  # reset current question counter
    session['listOfQuestions'] = []
    session['recAnswers'] = []

    # If theme doesn't exist, set to dark

    if not authenticated:
        error = 'You are not currently logged in.'
        return render_template('index.html', error=error)
    else:
        return redirect(url_for('rec'))

@app.route("/recPractice", methods=['POST', 'GET'])
def recPractice():
    if request.method == 'POST':

        if(len(session.get('listOfQuestions', [])) >= session.get('maxQuestions')):
            return redirect(url_for('recFinish'))

    else:
        session['listOfQuestions'] = []

    # theme = session.get('theme', 'Dark')
    rec_df = read_from_rec_file()
    companies, models, names, currentQuestion, rightCompany, rightModel, rightName = get_rec_questions(session.get('listOfQuestions', []), rec_df, len(rec_df))
    session['maxQuestions'] = len(rec_df)

    try:
        if session['listOfQuestions'] is None:
            session['listOfQuestions'] = [currentQuestion]
        else:
            session['listOfQuestions'].append(currentQuestion)
    except KeyError:
        session['listOfQuestions'] = [currentQuestion]

    session_data = {
        "answers": [
            companies.index(rightCompany),
            models.index(rightModel),
            names.index(rightName)
        ]
    }

    return render_template('recPractice.html', qImg=f"/NIFA/rec/images/{currentQuestion}.png",
                           man1=companies[0], man2=companies[1], man3=companies[2], man4=companies[3],
                           model1=models[0], model2=models[1], model3=models[2], model4=models[3],
                           name1=names[0], name2=names[1], name3=names[2], name4=names[3],
                           session_data=session_data)

@app.route("/rec", methods=['POST', 'GET'])
def rec():
    if request.method == 'POST':

        if(len(session.get('listOfQuestions', [])) >= session.get('maxQuestions')):
            return redirect(url_for('recFinish'))

    else:
        session['listOfQuestions'] = []

    # theme = session.get('theme', 'Dark')
    rec_df = read_from_rec_file()
    companies, models, names, currentQuestion, rightCompany, rightModel, rightName = get_rec_questions(session.get('listOfQuestions', []), rec_df, len(rec_df))
    session['maxQuestions'] = len(rec_df)

    try:
        if session['listOfQuestions'] is None:
            session['listOfQuestions'] = [currentQuestion]
        else:
            session['listOfQuestions'].append(currentQuestion)
    except KeyError:
        session['listOfQuestions'] = [currentQuestion]

    session_data = {
        "answers": [
            companies.index(rightCompany),
            models.index(rightModel),
            names.index(rightName)
        ]
    }

    return render_template('recPractice.html', qImg=f"/NIFA/rec/images/{currentQuestion}.png",
                           man1=companies[0], man2=companies[1], man3=companies[2], man4=companies[3],
                           model1=models[0], model2=models[1], model3=models[2], model4=models[3],
                           name1=names[0], name2=names[1], name3=names[2], name4=names[3],
                           session_data=session_data)


@app.route("/recFinish", methods=['POST', 'GET'])
def recFinish():
    return render_template('recFinish.html')


if __name__ == "__main__":
    port = 5000
    if(len(sys.argv) >= 2):
        port = sys.argv[1]
    app.config['SECRET_KEY'] = 'NA.bcr*xB2KJc7W!7mVHeG!xUC9uQo8qAJj7fE7wr2FbHM8A7kdRRaaN7a-zK9*.vxB92o3s.wgLRV76Z6qWvj9gb@Er*2cThNpe'
    app.run(port = port)