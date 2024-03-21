import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {Level} from "../level/level.component";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex = 0;
  score = 0;
  nextButton: HTMLElement | null = null;
  levelsButton: HTMLElement | null = null;
  showCreditButton: HTMLElement | null = null;
  selected = false;
  questionTxt = "";
  nextButtonTxt = "Next";
  levelFailed = false;
  levelPassed = false;
  levelCode = 0;
  levels: Level[] = [];
  allLevelsAreCompleted = false;
  showBackToLevelsButton = false;
  questions = [];

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.levels = JSON.parse(localStorage.getItem("levels"));
    this.levelCode = Number(this.route.snapshot.paramMap.get('id'));
    this.nextButton = document.getElementById("next-btn");
    this.levelsButton = document.getElementById("back-to-levels-btn");

    this.dataService.getQuestionsByLevel(this.levelCode).subscribe(res => {
      this.questions = res;
      this.startQuiz();
    });
  }

  startQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.nextButtonTxt = "Next";
    this.showQuestion()
    this.resetState();
  }

  resetState() {
    this.levelFailed = false;
    this.levelPassed = false;
  }

  selectAnswer(answer: HTMLElement, isCorrect: boolean) {
    this.selected = true;

    if (isCorrect) {
      answer.classList.add("correct")
      this.score++;
    } else {
      answer.classList.add("incorrect")
    }

    this.nextButton.style.display = 'block'
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.handleNextButton();
      this.showQuestion()
    } else {
      this.startQuiz();
    }
  }

  showQuestion() {
    if (this.questions && this.questions[this.currentQuestionIndex]) {
      this.questionTxt = this.currentQuestionIndex + 1 + ". " + this.questions[this.currentQuestionIndex].question;
    }
  }

  handleNextButton() {
    this.currentQuestionIndex++;
    this.selected = false;
    if (this.currentQuestionIndex < this.questions.length) {
      this.resetState();
    } else {
      this.showScore();
    }
  }

  showScore() {
    this.showBackToLevelsButton = true;
    this.selected = true;
    this.questionTxt = `You scored ${this.score} out of ${this.questions.length}!`;
    this.nextButtonTxt = "Try Again!";

    // if all answers are correct, mark level as completed
    if (this.score === this.questions.length) {
      let currentLevel = this.levels.find(el => el.code === this.levelCode);
      let nextLevel = this.levels.find(el => (el.code === this.levelCode + 1));
      currentLevel.completed = true;
      if (nextLevel) {
        nextLevel.available = true;
      }
      console.log("levels", this.levels);
      this.dataService.updateLevel(this.levels);
      this.allLevelsAreCompleted = this.checkAllLevelsAreCompleted();
      this.levelPassed = true;
    } else {
      this.levelFailed = true;
    }
  }

  goToLevels() {
    this.router.navigate(['level']);
  }

  showCredits() {
    this.router.navigate(['congrats']);
  }

  checkAllLevelsAreCompleted() {
    let failedlevel = this.levels.find(item => item.completed === false);
    return failedlevel === undefined;
  }
}
