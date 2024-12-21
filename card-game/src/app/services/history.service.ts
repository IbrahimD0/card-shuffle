// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// interface Card {
//   suit: string;
//   value: string;
//   drawn: number;
// }

// interface GameHistory {
//   id?: string;
//   date: Date;
//   drawnCards: Card[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class HistoryService {
//   constructor(private firestore: AngularFirestore) {}

//   saveGameHistory(drawnCards: Card[]): Promise<void> {
//     const gameHistory: GameHistory = {
//       date: new Date(),
//       drawnCards,
//     };
//     return this.firestore.collection('gameHistory').add(gameHistory);
//   }

//   getGameHistory(): Observable<GameHistory[]> {
//     return this.firestore.collection<GameHistory>('gameHistory', ref => ref.orderBy('date', 'desc')).snapshotChanges().pipe(
//       map(actions => actions.map(a => {
//         const data = a.payload.doc.data() as GameHistory;
//         const id = a.payload.doc.id;
//         return { id, ...data };
//       }))
//     );
//   }
// }
