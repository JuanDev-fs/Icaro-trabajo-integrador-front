import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ApiMemoService } from './service/api-memo.service';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ApiMemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
