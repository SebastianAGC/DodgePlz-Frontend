import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule} from "./auth/auth.module";
import { HomeComponent } from './home/home.component';
import {PlayersService} from "./services/players.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FooterComponent } from './landing/footer/footer.component';
import { HeaderComponent } from './landing/header/header.component';
import { MainComponent } from './landing/main/main.component';
import { NavComponent } from './landing/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
