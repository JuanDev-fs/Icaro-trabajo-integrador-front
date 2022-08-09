import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

 // logged:boolean=true
  logged:boolean=false
  username:string="juancito33"
  
  constructor() { }

  ngOnInit(): void {
  }

}
