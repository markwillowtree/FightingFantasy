import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlaythroughRoutingModule }  from './create-playthrough-routing.module';
import { CreatePlaythroughComponent } from './create-playthrough.component';

@NgModule({
    declarations: [
        CreatePlaythroughComponent
    ],
    imports: [
        CommonModule,
        CreatePlaythroughRoutingModule
    ]
})
export class CreatePlaythroughModule{}
