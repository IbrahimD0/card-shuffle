import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardDeckComponent } from "./components/card-deck/card-deck.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CardDeckComponent],
  template: `

    <app-navbar />
    <app-card-deck />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'card-game';
}
