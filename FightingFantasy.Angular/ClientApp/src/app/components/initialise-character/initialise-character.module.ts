import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialiseCharacterRoutingModule }  from './initialise-character-routing.module';
import { InitialiseCharacterComponent } from './initialise-character.component';
import {DiceModule} from '../dice/dice.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        InitialiseCharacterRoutingModule,
        ReactiveFormsModule,
        DiceModule,
        FormsModule
    ],
    declarations: [
        InitialiseCharacterComponent
    ]
    
})
export class InitialiseCharacterModule{}
