import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  currentQuestionIndex = 0;
  score = 0;
  nextButton: HTMLElement | null = null;
  selected = false;
  questionTxt = "";
  nextButtonTxt = "Next";

  questions = [
    {
      question: "Allah ﷲ",
      answers: [
        {text: "The Most or Entirely Merciful", correct: false},
        {text: "God", correct: true},
        {text: "The Bestower of Mercy", correct: false},
        {text: "The Absolutely Pure", correct: false},
      ]
    },
    {
      question: "Question 2?",
      answers: [
        {text: "Asia", correct: false},
        {text: "Australia", correct: true},
        {text: "Kazakhstan", correct: false},
        {text: "Africa", correct: false},
      ]
    }
  ]

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.nextButton = document.getElementById("next-btn");
    this.startQuiz();
  }

  startQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.nextButtonTxt = "Next";
    this.showQuestion()
    this.resetState();
  }

  resetState() {
    this.nextButton.style.display = "none";
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
    this.questionTxt = this.currentQuestionIndex + 1 + ". " + this.questions[this.currentQuestionIndex].question;
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
    this.questionTxt = `You scored ${this.score} out of ${this.questions.length}!`;
    this.nextButtonTxt = "Play Again!";
    this.nextButton.style.display = "block";
  }
}
