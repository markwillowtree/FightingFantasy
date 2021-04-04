import { Component, ElementRef, Input, OnInit, Output, QueryList, ViewChildren, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  @Input() numDice: number;
  @Output() dieRolled = new EventEmitter<number>();
  @ViewChildren('die') dies: QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {
  }

  rollDice() {
    var rolled = 0;

    this.dies.forEach((die) => {
      var number = Math.floor((Math.random() * 6) + 1);
      var currentClass = die.nativeElement.classList[0];
      var newClass = 'show-';

      switch (number) {
        case 1:
          newClass += 'front';
          break;
        case 2:
          newClass += 'top';
          break;
        case 3:
          newClass += 'left';
          break;
        case 4:
          newClass += 'right';
          break;
        case 5:
          newClass += 'bottom';
          break;
        case 6:
          newClass += 'back';
          break;
        default:
          alert(`error, invalid number ${number}`);
      }

      rolled += number;

      if (currentClass == newClass) {
        die.nativeElement.classList.add('show-same');

        // Remove animation class after animation has finished
        setTimeout(function () {
          die.nativeElement.classList.remove('show-same');
        }, 500);
      }
      else {
        die.nativeElement.classList.replace(currentClass, newClass);
      }

      
      //console.log(element);
    });

    this.dieRolled.emit(rolled);
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
      items.push(i);
    }
    return items;
  }


}
