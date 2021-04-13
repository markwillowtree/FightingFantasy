import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaythroughRoutingModule }  from './playthrough-routing.module';
import { PlaythroughComponent } from './playthrough.component';
import {DiceModule} from '../dice/dice.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        PlaythroughComponent
    ],
    imports: [
        CommonModule,
        PlaythroughRoutingModule,
        ReactiveFormsModule,
        DiceModule
    ]
})
export class PlaythroughModule{}
