import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiMemoService } from 'src/app/service/api-memo.service';

@Component({
  selector: 'app-out-box',
  templateUrl: './out-box.component.html',
  styleUrls: ['./out-box.component.css']
})
export class OutBoxComponent implements OnInit {
  outBoxMemosV2:any[]=[]
  inboxMemosSubscription!:Subscription;
  showTable:boolean=false
  displayedColumns: string[] = [ 'destinatario', 'mensaje','fecha'];
  username:string = ''

  constructor(private fb: FormBuilder,private apiMemoService:ApiMemoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "[]"
    this.inboxMemosSubscription = this.apiMemoService.getAllMessageSent(this.username).subscribe((data: any[]) => {
      console.log('esto es data antes de hacer el if',data[0]);
      if(data[0]){
        this.outBoxMemosV2=data[0].mensajeEscrito
        this.showTable=true
      }
    })
  }

}
