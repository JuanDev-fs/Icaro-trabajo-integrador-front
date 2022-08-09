import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { OutBoxComponent } from './out-box/out-box.component';
import { CreateMemosComponent } from './create-memos/create-memos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatSortModule} from '@angular/material/sort';

const components = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  InboxComponent,
  CreateMemosComponent,
  OutBoxComponent,
  PageNotFoundComponent
]

@NgModule({
  declarations: [
    components,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule ,
    MatSortModule//para ordenar tabla pero no funciona todavia
  ],
  exports:[
    components
  ]
})
export class PagesModule { }
