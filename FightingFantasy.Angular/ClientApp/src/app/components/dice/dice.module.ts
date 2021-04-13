import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiceComponent} from '../dice/dice.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        DiceComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        DiceComponent
    ]
})
export class DiceModule{}
