# Deck Shuffle and Deal

A web application for managing a deck of cards: shuffle, deal, reset, and track history!

---

## Table of Contents
- [About](#about)
- [Requirements](#requirements)
  - [Development](#development)
- [App Walkthrough](#app-walkthrough)
- [Authors](#authors)

---

## About

Deck Shuffle and Deal is a feature-rich Angular application that simulates a standard 52-card deck. It provides functionalities to shuffle the deck, deal cards, reset the deck, and view the history of dealt hands. 

**Tech Stack:**  
- **Frontend:** Angular, Angular Material  
- **Database:** Firebase (Firestore)

---

## Requirements

### Development
- Node.js 
- npm 
- Angular CLI 
  ```bash
  npm install -g @angular/cli
  ```

### Setup and Installation
1. **Clone the repository**: 
Use the following command to clone the repository:
```
   git clone https://github.com/ibrahimd0/card-shuffle
```
in terminal go into card-game folder
```
   cd card-game
```
Install project dependencies
Run the command to install all necessary dependencies:
```
   npm install
```
2. **Setup Firebase firestore**: 

-Go to the Firebase Console and create a new Firebase project.
-Enable Firestore in your Firebase project settings.

-Copy the firebaseConfig inside firebase.service.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id',
  },
};
-Start the development server
-Launch the Angular development server:


```bash
   ng serve
```
-Open the application
-In your web browser, navigate to:
-http://localhost:4200

##App Walkthrough

#Key Features:
- Shuffle Deck: Randomizes the order of cards in the deck.
- Deal Cards: Deals a specified number of cards and displays them visually.
- Reset Deck: Restores the full deck of 52 cards.
How to Use:
Shuffle Deck: Click the "Shuffle" button to randomize the deck.
Deal Cards: Enter the number of cards you want to deal and click "Deal."
Reset Deck: Click the "Reset" button to restore the full deck.
History: Click "View History" to review past deals.

##Authors
- [@ibrahimd0](https://github.com/ibrahimd0)



