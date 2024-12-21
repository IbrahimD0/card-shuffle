import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a href="#" class="text-white text-lg font-semibold">Card Game</a>
        <div class="space-x-4">
          <a href="#" class="text-gray-300 hover:text-white">Home</a>
          <a href="#" class="text-gray-300 hover:text-white">History</a>
          <a href="#" class="text-gray-300 hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {
  title = signal('navbar works!');

}
