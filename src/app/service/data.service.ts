import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Level} from "../modules/level/level.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  levels: Level[] = [];

  private levelsBehaviorSubject = new BehaviorSubject<any>(null);

  levels$ = this.levelsBehaviorSubject.asObservable();

  updateLevel(levels: any) {
    this.levelsBehaviorSubject.next(levels);
  }

  constructor() {
    for (let i = 1; i <= 3; i++) {
      const level = new Level();
      level.code = i;
      level.available = i === 1; // Set the first level as available
      this.levels.push(level);
    }
    this.levelsBehaviorSubject.next(this.levels);
  }
}
