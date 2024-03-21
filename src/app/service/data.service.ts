import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Level} from "../modules/level/level.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  levels: Level[] = [];

  private levelsBehaviorSubject = new BehaviorSubject<any>(null);

  levels$ = this.levelsBehaviorSubject.asObservable();

  updateLevel(levels: any) {
    this.levelsBehaviorSubject.next(levels);
    localStorage.setItem("levels", JSON.stringify(levels))
  }

  constructor(private httpClient: HttpClient) {
    for (let i = 1; i <= 6; i++) {
      const level = new Level();
      level.code = i;
      level.available = i === 1; // Set the first level as available
      this.levels.push(level);
    }
    this.levelsBehaviorSubject.next(this.levels);
    localStorage.setItem("levels", JSON.stringify(this.levels))
  }

  getQuestionsByLevel(level: number) {
    let url = `/assets/questions/level${level}.json`;
    return this.httpClient.get<any[]>(url);
  }
}
