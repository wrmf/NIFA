import random

def get_rec_questions(listOfQuestions, question_df, maxQuestions):
    currentQuestion = random.randint(0, maxQuestions - 1)

    if listOfQuestions is not None:
        while currentQuestion in listOfQuestions:  # Make sure this question has not been asked already this game
            currentQuestion = random.randint(0, maxQuestions - 1)


    companies = [question_df["Company"][currentQuestion]]
    rightCompany = companies[0]
    for i in range(0, len(question_df["WrongComp"][currentQuestion].split(','))):
        companies.append(question_df["WrongComp"][currentQuestion].split(',')[i])

    models = [question_df["Model"][currentQuestion]]
    rightModel = models[0]
    for i in range(0, len(question_df["WrongMod"][currentQuestion].split(','))):
        models.append(question_df["WrongMod"][currentQuestion].split(',')[i])
        if models[i] == "No Model":
            models[i] = "None"

    names = [question_df["Name"][currentQuestion]]
    rightName = names[0]
    for i in range(0, len(question_df["WrongName"][currentQuestion].split(','))):
        names.append(question_df["WrongName"][currentQuestion].split(',')[i])
        if names[i] == "No Name":
            names[i] = "None"

    random.shuffle(companies)
    random.shuffle(models)
    random.shuffle(names)

    return [companies, models, names, currentQuestion, rightCompany, rightModel, rightName]