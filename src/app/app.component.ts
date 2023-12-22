import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
  one = 1;
  two = 2;
  three = 3;
  four = 4;
  five = 5;
  six = 6;
  seven = 7;
  eight = 8;
  nine = 9;


  calc() {
    

  }


}
