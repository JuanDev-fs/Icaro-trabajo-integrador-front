import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { InboxComponent } from '../pages/inbox/inbox.component';
import { OutBoxComponent } from '../pages/out-box/out-box.component';
import { CreateMemosComponent } from '../pages/create-memos/create-memos.component';



const routes:Routes = [
  
  {path:'login',title:'Login', component:LoginComponent},
  {path:'register',title:'Register',component:RegisterComponent},
  {path:'inbox',title:'Inbox',component:InboxComponent},
  {path:'sent',title:'OutBox',component:OutBoxComponent},
  {path:'create',title:'New Memo',component:CreateMemosComponent},
  {path:'',title:'Home', component:HomeComponent},
  {path:'**',title:'Page Not Found', component:HomeComponent},
  {path:'logout',redirectTo: '/', pathMatch: 'full'},
//redirectTo: '/first-component', pathMatch: 'full'
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
