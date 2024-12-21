import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="w-20 h-32 sm:w-32 sm:h-48 bg-white rounded-lg shadow-lg border border-gray-300 flex items-center justify-center p-2 hover:shadow-xl transition-shadow duration-300 relative"
      [attr.aria-label]="value + ' of ' + suit"
    >
      
      <div class="absolute top-2 left-2 flex flex-col items-start">
        <span class="md sm:text-xl font-bold" [ngClass]="suitColor">{{ value }}</span>
        <span class="lg sm:text-2xl" [ngClass]="suitColor">{{ suitSymbol }}</span>
      </div>
      
     
      <div class="text-2xl sm:text-5xl" [ngClass]="suitColor">
        {{ suitSymbol }}
      </div>
      
      
      <div class="absolute bottom-2 right-2 flex flex-col items-end rotate-180">
        <span class="md sm:text-xl font-bold" [ngClass]="suitColor">{{ value }}</span>
        <span class="lg sm:text-2xl" [ngClass]="suitColor">{{ suitSymbol }}</span>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() suit!: string;
  @Input() value!: string;

  get suitSymbol(): string {
    switch (this.suit) {
      case 'hearts':
        return '♥';
      case 'diamonds':
        return '♦';
      case 'clubs':
        return '♣';
      case 'spades':
        return '♠';
      default:
        return '';
    }
  }

  get suitColor(): string {
    return this.suit === 'hearts' || this.suit === 'diamonds' ? 'text-red-500' : 'text-black';
  }
}