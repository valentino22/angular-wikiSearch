import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { WikipediaService } from './wikipedia.service';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [WikipediaService],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
