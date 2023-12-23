import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent {
  levels: Level[] = [];

  constructor(private router: Router) {
    for (let i = 1; i <= 3; i++) {
      const level = new Level();
      level.code = i;
      level.available = i === 1; // Set the first level as available
      this.levels.push(level);
    }
  }

  goToLevel(i: number) {
    this.router.navigate(['quiz', i]);
  }
}

class Level {
  code: number;
  completed: boolean = false;
  available: boolean = false;
}
