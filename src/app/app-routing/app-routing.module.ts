import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { InboxComponent } from '../pages/inbox/inbox.component';
import { OutBoxComponent } from '../pages/out-box/out-box.component';
import { CreateMemosComponent } from '../pages/create-memos/create-memos.component';
import { AuthGuard } from '../guards/auth.guard';
import { DisableGuard } from '../guards/disable.guard';



const routes: Routes = [

  { path: 'login', title: 'Login', component: LoginComponent, canActivate: [DisableGuard] },
  { path: 'register', title: 'Register', component: RegisterComponent, canActivate: [DisableGuard] },
  { path: 'inbox', title: 'Inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: 'sent', title: 'OutBox', component: OutBoxComponent, canActivate: [AuthGuard] },
  { path: 'create', title: 'New Memo', component: CreateMemosComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
