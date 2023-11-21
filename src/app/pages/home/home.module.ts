import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { AboutComponent } from '../about/about.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [    
    PortfolioComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class HomeModule { }
