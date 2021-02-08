import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconsComponent } from './icons/icons.component';

const routes: Routes = [
  { path: 'icons', component: IconsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
