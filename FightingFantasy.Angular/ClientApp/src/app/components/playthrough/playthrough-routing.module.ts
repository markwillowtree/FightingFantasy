import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaythroughComponent } from './playthrough.component';

const routes: Routes = [{ path: '', component: PlaythroughComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaythroughRoutingModule { }
