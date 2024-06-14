import random

def get_rec_questions(listOfQuestions, question_df, maxQuestions):
    currentQuestion = random.randint(0, maxQuestions - 1) #Set an initial random question

    if listOfQuestions is not None: #If this is not the first question
        while currentQuestion in listOfQuestions:  # Make sure this question has not been asked already this game
            currentQuestion = random.randint(0, maxQuestions - 1) #Replace with a new unasked question


    companies = [question_df["Company"][currentQuestion]] #Get the right company
    for i in range(0, len(question_df["WrongComp"][currentQuestion].split(','))): #Get the wrong companies
        companies.append(question_df["WrongComp"][currentQuestion].split(',')[i]) #Add the wrong companies to the list
    rightCompany = companies[0] #Set the right company

    models = [question_df["Model"][currentQuestion]] #Get the right model
    for i in range(0, len(question_df["WrongMod"][currentQuestion].split(','))): #Get the wrong models
        models.append(question_df["WrongMod"][currentQuestion].split(',')[i]) #Add the wrong models to the list

    for i in range(0, len(models)): #Replace with None (due to python read in error)
        if models[i] == "No Model" or models[i] == " No Model":
            models[i] = "None" #Set None model

    rightModel = models[0] #Set the correct model

    names = [question_df["Name"][currentQuestion]] #Get the right name
    for i in range(0, len(question_df["WrongName"][currentQuestion].split(','))): #Get the wrong names
        names.append(question_df["WrongName"][currentQuestion].split(',')[i]) #Add the wrong names to the list

    for i in range(0, len(names)): #Replace with None (due to python read in error)
        if names[i] == "No Name" or names[i] == " No Name":
            names[i] = "None" #Set None name

    rightName = names[0] #Set the correct name

    random.shuffle(companies) #Randomize the order of the companies
    random.shuffle(models) #Randomize the order of the models
    random.shuffle(names) #Randomize the order of the names

    return [companies, models, names, currentQuestion, rightCompany, rightModel, rightName]