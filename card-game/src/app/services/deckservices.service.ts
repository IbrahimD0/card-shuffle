import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
// import { HistoryService } from './history.service';

interface Card {
  suit: string;
  value: string;
  drawn: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeckservicesService {
  private suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  private values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  private deck: Card[] = [];
  private drawCount: number = 0;

  constructor(private firebaseService: FirebaseService) {}


  async loadInitialDeck(): Promise<void> {
    try {
      const savedDeck = await this.firebaseService.loadDeck();
      if (savedDeck.length === 0) {
        await this.createNewDeck();
      } else {
        this.deck = savedDeck;
        this.drawCount = this.deck.filter(card => card.drawn !== -1).length;
      }
    } catch (error) {
      console.error('Failed to load deck:', error);
      await this.createNewDeck();
    }
  }

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

  async shuffleDeck(): Promise<void> {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    await this.firebaseService.saveDeck(this.deck);
  }

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

  async resetDeck(): Promise<void> {
    // const drawnCards = this.getDrawnCards();
    // if (drawnCards.length > 0) {
    //   await this.historyService.saveGameHistory(drawnCards);
    // }
    await this.createNewDeck();
  }

  getRemainingCards(): Card[] {
    return this.deck.filter(card => card.drawn === -1);
  }

  getDrawnCards(): Card[] {
    return this.deck
      .filter(card => card.drawn !== -1)
      .sort((a, b) => a.drawn - b.drawn);
  }
}