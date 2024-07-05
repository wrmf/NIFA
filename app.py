from flask import Flask, render_template, request, redirect, url_for, session, Blueprint
import sys
from modules.questions import *
from fileIO import *
from password import password
import numpy as np
import pandas as pd
import importlib
import string


TEMPLATES_AUTO_RELOAD = True

MAXQUESTIONS = 10
app = Flask(__name__)

# index page
@app.route("/", methods=['GET', 'POST'])
def index():

    error = 'You are not currently logged in'

    if request.method == 'GET':
        session['authenticated'] = False
        session['currentQuestion'] = 0  # reset current question counter
        session['numCorrect'] = 0  # reset current question counter
        session['answerString'] = ""  # reset current question counter
        session['listOfQuestions'] = []
        session['recAnswers'] = []
    else:
        submittedPass = request.form.get('psw')
        if submittedPass == password:
            session['authenticated'] = True
        else:
            error = 'Incorrect password. Please try again.'

    if not session.get('authenticated', None):
        return render_template('index.html', error=error)
    else:
        return redirect(url_for('rec'))


@app.route("/rec", methods=['POST', 'GET'])
def rec():
    if not session.get('authenticated', None):
        return redirect(url_for('index'))

    rec_df = read_from_rec_file()

    if request.method == 'GET':
        tags = rec_df['Tags'].unique()
        tags = sorted(tags)
        tags.insert(0, "Select a Tag")

        companies = rec_df['Company'].unique()
        companies = sorted(companies)
        companies.insert(0, "Select a Company")

        session['listOfQuestions'] = []

        return render_template('rec.html', companies=companies, tags=tags)

    elif request.method == "POST":
        selected_company = request.form.get('Companies')
        selected_tag = request.form.get('Tags')
        button_clicked = request.form.get('button')

        session['selected_company'] = selected_company
        session['selected_tag'] = selected_tag

        if button_clicked == 'study':
            return redirect(url_for('recStudy'))
        elif button_clicked == 'practice':
            return redirect(url_for('recPractice'))
        elif button_clicked == 'test':
            return redirect(url_for('recTest'))


@app.route("/recPractice", methods=['POST', 'GET'])
def recPractice():

    if not session.get('authenticated', None):
        return redirect(url_for('index'))

    if session.get('selected_company') is None or session.get('selected_tag') is None:
        return redirect(url_for('rec'))

    if request.method == 'POST':

        if(len(session.get('listOfQuestions', [])) >= session.get('maxQuestions')):
            return redirect(url_for('recFinish'))

    else:
        session['listOfQuestions'] = []

    rec_df = read_from_rec_file()

    if(session.get('selected_company') == "Select a Company" and session.get('selected_tag') == "Select a Tag"):
        pass
    elif(session.get('selected_company') == "Select a Company"):
        rec_df = rec_df[rec_df['Tags'] == session.get('selected_tag')]
    elif(session.get('selected_tag') == "Select a Tag"):
        rec_df = rec_df[rec_df['Company'] == session.get('selected_company')]

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

    return render_template('recPractice.html', qImg=f"../static/rec/images/{currentQuestion}.png",
                           man1=companies[0], man2=companies[1], man3=companies[2], man4=companies[3],
                           model1=models[0], model2=models[1], model3=models[2], model4=models[3],
                           name1=names[0], name2=names[1], name3=names[2], name4=names[3],
                           session_data=session_data)

@app.route("/recStudy", methods=['POST', 'GET'])
def recStudy():

    if not session.get('authenticated', None):
        return redirect(url_for('index'))

    if session.get('selected_company') is None or session.get('selected_tag') is None:
        return redirect(url_for('rec'))

    if request.method == 'POST':

        if(len(session.get('listOfQuestions', [])) >= session.get('maxQuestions')):
            return redirect(url_for('recFinish'))

    else:
        session['listOfQuestions'] = []

    rec_df = read_from_rec_file()

    if(session.get('selected_company') == "Select a Company" and session.get('selected_tag') == "Select a Tag"):
        pass
    elif(session.get('selected_company') == "Select a Company"):
        rec_df = rec_df[rec_df['Tags'] == session.get('selected_tag')]
    elif(session.get('selected_tag') == "Select a Tag"):
        rec_df = rec_df[rec_df['Company'] == session.get('selected_company')]

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

    return render_template('recStudy.html', qImg=f"../static/rec/images/{currentQuestion}.png",
                           man1=rightCompany,
                           model1=rightModel,
                           name1=rightName,
                           session_data=session_data)

@app.route("/recTest", methods=['POST', 'GET', 'GET_BUT_NOT_NEW'])
def recTest():
    if not session.get('authenticated', None):
        return redirect(url_for('index'))

    if session.get('selected_company') is None or session.get('selected_tag') is None:
        return redirect(url_for('rec'))

    rec_df = read_from_rec_file()

    if request.method == 'GET':
        try:
            if session['listOfQuestions'] is None:
                pass
        except KeyError:
            session['listOfQuestions'] = []

        if (len(session.get('listOfQuestions', [])) >= session.get('maxQuestions')):
            return redirect(url_for('recFinish'))

        if(session.get('selected_company') == "Select a Company" and session.get('selected_tag') == "Select a Tag"):
            pass
        elif(session.get('selected_company') == "Select a Company"):
            rec_df = rec_df[rec_df['Tags'] == session.get('selected_tag')]
        elif(session.get('selected_tag') == "Select a Tag"):
            rec_df = rec_df[rec_df['Company'] == session.get('selected_company')]

        currentQuestion = get_next_question_id(session.get('listOfQuestions', []), rec_df, len(rec_df))
        session['maxQuestions'] = len(rec_df)

        try:
            if session['listOfQuestions'] is None:
                session['listOfQuestions'] = [currentQuestion]
            else:
                session['listOfQuestions'].append(currentQuestion)
        except KeyError:
            session['listOfQuestions'] = [currentQuestion]

        return render_template('recTestQ.html', qImg=f"../static/rec/images/{currentQuestion}.png")
    else:
        companies, models, names, rightCompany, rightModel, rightName = get_question_from_id(read_from_rec_file(), session.get('listOfQuestions')[len(session.get('listOfQuestions'))-1])

        session_data = {
            "answers": [
                companies.index(rightCompany),
                models.index(rightModel),
                names.index(rightName)
            ]
        }

        return render_template('recTestA.html',
                               man1=companies[0], man2=companies[1], man3=companies[2], man4=companies[3],
                               model1=models[0], model2=models[1], model3=models[2], model4=models[3],
                               name1=names[0], name2=names[1], name3=names[2], name4=names[3],
                               session_data=session_data)

@app.route("/recFinish", methods=['POST', 'GET'])
def recFinish():

    if not session.get('authenticated', None):
        return redirect(url_for('index'))

    session['selected_company'] = "Select a Company" #Reset selected company
    session['selected_tag'] = 'Select a Tag' #Reset selected tag

    return render_template('recFinish.html')


if __name__ == "__main__":
    port = 5000
    if(len(sys.argv) >= 2):
        port = sys.argv[1]
    app.config['SECRET_KEY'] = 'NA.bcr*xB2KJc7W!7mVHeG!xUC9uQo8qAJj7fE7wr2FbHM8A7kdRRaaN7a-zK9*.vxB92o3s.wgLRV76Z6qWvj9gb@Er*2cThNpe'
    app.run(port = port)