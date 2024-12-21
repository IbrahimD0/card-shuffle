export interface Card {
    suit: Suit; 
    value: CardValue;
    drawn: number; // -1 if not drawn, otherwise the order in which it was drawn
  }
  
  export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
  export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  
 
  
