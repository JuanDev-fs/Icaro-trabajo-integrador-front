import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MessagesComponent } from './messages/messages.component';

const components =[
  ToolbarComponent,
  SideNavComponent,
  MessagesComponent
  
]

@NgModule({
  declarations: [
    components,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    components
  ]
})
export class SharedModule { }
