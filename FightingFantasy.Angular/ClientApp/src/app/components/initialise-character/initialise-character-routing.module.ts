import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialiseCharacterComponent } from './initialise-character.component';

const routes: Routes = [{ path: '', component: InitialiseCharacterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialiseCharacterRoutingModule { }
