import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsComponent } from './icons/icons.component';
import { IconDrawerComponent } from './icons/icon-drawer/icon-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    IconsComponent,
    IconDrawerComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
