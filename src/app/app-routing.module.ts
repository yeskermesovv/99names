import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {QuizComponent} from "./modules/quiz/quiz.component";
import {LevelComponent} from "./modules/level/level.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz/:id', component: QuizComponent},
  { path: 'level', component: LevelComponent, data: { animation: 'isRight' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
