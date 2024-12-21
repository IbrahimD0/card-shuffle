import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
// import { HistoryService } from './history.service';
import { Card, Suit, CardValue } from '../type';

@Injectable({
  providedIn: 'root',
})


export class DeckservicesService {


  private suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  private values: CardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  private deck: Card[] = [];
  //keep track of the number of cards drawn
  private drawCount: number = 0;



  constructor(private firebaseService: FirebaseService) {}



  //load the initial deck by calling the loadDeck method from the firebase service
  async loadInitialDeck(): Promise<void> {
    try {
      const savedDeck = await this.firebaseService.loadDeck();
      if (savedDeck.length === 0) {
        await this.createNewDeck();
      } else {
        this.deck = savedDeck.map(card => ({
          ...card,
          suit: card.suit as Suit,
          value: card.value as CardValue,
          
        }));
        this.drawCount = this.deck.filter(card => card.drawn !== -1).length;
      }
    } catch (error) {
      console.error('Failed to load deck:', error);
      await this.createNewDeck();
    }
  }

  //create a new deck by iterating through the suits and values arrays and pushing each card to the deck array
  private async createNewDeck(): Promise<void> {
    const newDeck: Card[] = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        newDeck.push({ suit, value, drawn: -1 });
      }
    }
    this.drawCount = 0;
    this.deck = newDeck;
    await this.firebaseService.saveDeck(newDeck);
  }

  //shuffle the deck array by iterating through the deck array and swapping each card with a random card
  async shuffleDeck(): Promise<void> {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    await this.firebaseService.saveDeck(this.deck);
  }

  //deal a specified number of cards by filtering the deck array to get the undrawn cards and drawing the first n cards
  async dealCards(count: number): Promise<Card[]> {
    const dealtCards: Card[] = [];
    let remainingUndrawn = this.deck.filter(card => card.drawn === -1);

    for (let i = 0; i < count && i < remainingUndrawn.length; i++) {
      const cardIndex = this.deck.findIndex(card => card.drawn === -1);
      if (cardIndex !== -1) {
        this.deck[cardIndex].drawn = this.drawCount++;
        dealtCards.push(this.deck[cardIndex]);
      }
    }

    await this.firebaseService.saveDeck(this.deck);
    return dealtCards;
  }

  //reset the deck by creating a new deck
  async resetDeck(): Promise<void> {
    // const drawnCards = this.getDrawnCards();
    // if (drawnCards.length > 0) {
    //   await this.historyService.saveGameHistory(drawnCards);
    // }
    await this.createNewDeck();
  }

  //filter the deck array to get the undrawn cards
  getRemainingCards(): Card[] {
    return this.deck.filter(card => card.drawn === -1);
  }

  //filter the deck array to get the drawn cards and sort them by the order they were drawn
  getDrawnCards(): Card[] {
    return this.deck
      .filter(card => card.drawn !== -1)
      .sort((a, b) => a.drawn - b.drawn);
  }
}