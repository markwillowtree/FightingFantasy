import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlaythroughComponent } from './create-playthrough.component';

const routes: Routes = [{ path: '', component: CreatePlaythroughComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePlaythroughRoutingModule { }
