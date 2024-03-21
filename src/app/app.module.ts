import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { QuizComponent } from './modules/quiz/quiz.component';
import { LevelComponent } from './modules/level/level.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CongratsComponent } from './modules/congrats/congrats.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    LevelComponent,
    CongratsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
