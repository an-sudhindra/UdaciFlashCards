# Udacity Mobile Flashcards
Mobile Fashcards Application has been created using **React Native** and **Redux** as a part of **React NanoDegree** requirement from Udacity.

The app provides the user the ability to create Decks. Each deck can contain number of cards (or questions and answers). Users can create n number of decks. The app allows users to view deck details and take quizzes and display the results.

# Installation Instructions
- You need to have Node.js, npm, yarn (expo for android simulation) installed.
- Proceed with cloning or downloading the project as a zip.
- Extract and change directory to the project folder.
- Run "yarn install"
- Run "expo start" command

This application was tested only on **Android simulator** and **Samsung M30S** handest using **EXPO** app.

# Application Features
## Home
The home page / screen contains 2 tabs. All the decks are displayed in the **Dashboard** tab. Users are allowed to create n number of decks using the second tab **Add Deck**. 

## Add Deck
Select the secodn tab in the Home screen. Enter the name of the deck and tap "Create Deck" button to create a new Deck. This will create the deck and displays the **Deck Details** screen.

## Deck Details
This screen displays the Deck in details. It lists the all the cards / questions if any in the deck. Users can add new cards to the deck or take quiz or delete the deck from this screen.

## Add Card
This screen allows users to create the new card. The screen displays free from text fields one for question and another for answer. Enter the question and answer, tap on the "Submit" button to add the details to the deck.

## Delete Deck
Users can use this option to delete the decks. 

## Quiz
Users can take the Quiz from the **Deck Details** page. The screen lists questions one by one and user has to guess the answer to the question. Tapping "Show Answer" button will display the correct answer. Users has to select whether the answer they guessed is "Correct" or  "Incorrect" and tap the respective buttons on the screen. Once all questions are answered, Quiz results page gets displayed. This screen dispays the user score and options to go "Home" to to "Retake Quiz". Number of questions are displayed as the quiz progresses.

**Users are notified on daily basis to take at least one quiz a day**