import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DetailsCardComponent } from './details-card/details-card.component';
import { DetailsCardService } from './details-card/details-card.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    DetailsCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DetailsCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
