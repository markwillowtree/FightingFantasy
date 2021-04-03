import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  @Input() numDice: number;


  constructor() { }

  ngOnInit(): void {
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
      items.push(i);
    }
    return items;
  }
}
