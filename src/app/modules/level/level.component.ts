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
    })
  }

  goToLevel(i: number) {
    this.router.navigate(['quiz', i]);
  }
}

export class Level {
  code: number;
  completed: boolean = false;
  available: boolean = false;
}
