import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiMemoService } from './service/api-memo.service';
import { MaterialModule } from './material/material.module';
import { MessageService } from './service/message.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { GetUsersService } from './service/get-users.service';

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
  providers: [
    GetUsersService,
    ApiMemoService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
