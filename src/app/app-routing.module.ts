import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconsComponent } from './icons/icons.component';
import { PanelsComponent } from './panels/panels.component';

const routes: Routes = [
  { path: 'icons', component: IconsComponent},
  { path: 'panels', component: PanelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
