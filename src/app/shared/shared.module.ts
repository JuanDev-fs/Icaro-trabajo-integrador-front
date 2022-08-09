import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const components =[
  ToolbarComponent,
  SidebarComponent,
  SideNavComponent,
  
]

@NgModule({
  declarations: [
    components
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
