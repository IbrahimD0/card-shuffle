import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeckservicesService } from '../../services/deckservices.service';
import { CardComponent } from '../card/card.component';
import { MatIconModule } from '@angular/material/icon';

interface Card {
  suit: string;
  value: string;
  drawn: number;
}

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, MatIconModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="text-center mb-4 text-gray-700">
        <p>Remaining cards: {{ remainingCards.length }}</p>
        <p>Dealt cards: {{ dealtCards.length }}</p>
        @if (!isValidCardCount) {
        <p class="text-red-500 text-sm">
          Please enter a number between 1 and {{ remainingCards.length }}
        </p>
        }
      </div>

      <div
        class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-10 gap-2 w-[80vw] h-[65vh] overflow-auto mx-auto"
      >
        @if (dealtCards.length === 0) {
        <div class="text-4xl text-center text-gray-500 m-auto w-[80vw] h-100">
          No cards dealt yet
        </div>
        } @for (card of dealtCards; track card.drawn) {
          <app-card [suit]="card.suit" [value]="card.value" />
        }
      </div>

      <div class="flex justify-center p-2 gap-2 mb-4">
        <div class="flex items-center space-x-2">
          <input
            type="number"
            [(ngModel)]="numberOfCardsToDeal"
            (input)="validateCardCount()"
            class="border rounded py-2 px-4 w-24 text-center"
            placeholder="Cards"
            [min]="1"
            [max]="remainingCards.length"
          />
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold h-12 w-12 sm:h-16 sm:w-32 rounded-full sm:rounded-xl border-gray flex items-center justify-center"
            (click)="dealCards()"
            [disabled]="!isValidCardCount || remainingCards.length === 0"
          >
            <span class="hidden sm:inline">Deal Cards</span>
            <mat-icon class="sm:hidden">add</mat-icon>
          </button>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-12 sm:h-16 sm:w-32 rounded-full sm:rounded-xl border-gray flex items-center justify-center"
          (click)="shuffleDeck()"
          [disabled]="remainingCards.length === 0"
        >
          <span class="hidden sm:inline">Shuffle</span>
          <mat-icon class="sm:hidden">shuffle</mat-icon>
        </button>

        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold h-12 w-12 sm:h-16 sm:w-32 rounded-full sm:rounded-xl border-gray flex items-center justify-center"
          (click)="resetDeck()"
        >
          <span class="hidden sm:inline">Reset Deck</span>
          <mat-icon class="sm:hidden">refresh</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
    `,
  ],
})
export class CardDeckComponent {
  dealtCards: Card[] = [];
  remainingCards: Card[] = [];
  numberOfCardsToDeal: number = 1;
  isValidCardCount: boolean = true;

  constructor(private deckService: DeckservicesService) {
    this.loadInitialState();
  }

  private async loadInitialState() {
    await this.deckService.loadInitialDeck();
    this.updateLocalState();
  }

  private updateLocalState() {
    this.remainingCards = this.deckService.getRemainingCards();
    this.dealtCards = this.deckService.getDrawnCards();
    this.validateCardCount();
  }

  validateCardCount(): void {
    this.isValidCardCount =
      this.numberOfCardsToDeal >= 1 &&
      this.numberOfCardsToDeal <= this.remainingCards.length &&
      Number.isInteger(this.numberOfCardsToDeal);
  }

  async shuffleDeck(): Promise<void> {
    await this.deckService.shuffleDeck();
    this.updateLocalState();
  }

  async dealCards(): Promise<void> {
    if (!this.isValidCardCount) return;

    await this.deckService.dealCards(this.numberOfCardsToDeal);
    this.updateLocalState();
  }

  async resetDeck(): Promise<void> {
    await this.deckService.resetDeck();
    this.updateLocalState();
    this.numberOfCardsToDeal = 1;
  }
}