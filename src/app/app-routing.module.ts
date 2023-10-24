import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {QuizComponent} from "./modules/quiz/quiz.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
