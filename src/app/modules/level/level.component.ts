import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit{
  levels: Level[] = [];

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.levels$.subscribe(res => {
      this.levels = res;

      // find last completed level and open next one
      let lastCompletedLevelIndex = this.findLastIndex(this.levels, 'completed', true);
      if (lastCompletedLevelIndex !== -1 && this.levels.length - lastCompletedLevelIndex > 1) {
        this.levels[lastCompletedLevelIndex + 1].available = true;
      }
    })
  }

  goToLevel(i: number) {
    this.router.navigate(['quiz', i]);
  }

  findLastIndex(array, searchKey, searchValue) {
    let index = array.slice().reverse().findIndex(x => x[searchKey] === searchValue);
    let count = array.length - 1
    let finalIndex = index >= 0 ? count - index : index;
    console.log(finalIndex)
    return finalIndex;
  }
}

export class Level {
  code: number;
  completed: boolean = false;
  available: boolean = false;
}
