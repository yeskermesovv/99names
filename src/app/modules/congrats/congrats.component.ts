import { Component } from '@angular/core';
import confetti from 'canvas-confetti';


@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
  isClicked = false;
  confettiTriggered = false;
  isButtonDisabled = false;

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  onClick(): void {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };


    if (this.isButtonDisabled) {
      return;
    }

    if (this.isClicked && !this.confettiTriggered) {
      this.isClicked = false;
    } else if (!this.confettiTriggered) {
      this.isClicked = true;

      // confetti({
      //   particleCount: 40,
      //   spread: 100,
      //   angle: this.randomInRange(55, 125),
      //   colors: ['#fff367', '#001e4d', '#fff367']
      // });

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      this.confettiTriggered = true;

      // this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 10);
    } else {
      this.confettiTriggered = false;
    }
  }
}
