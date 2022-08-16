import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inbox } from 'src/app/inbox.interface';
import { ApiMemoService } from 'src/app/service/api-memo.service';

@Component({
  selector: 'app-out-box',
  templateUrl: './out-box.component.html',
  styleUrls: ['./out-box.component.css']
})
export class OutBoxComponent implements OnInit {
  outBoxMemosV2:any[]=[]
  outBoxMemos:Inbox[]=[]
  inboxMemosSubscription!:Subscription;
  showTable:boolean=false

  // displayedColumns: string[] = ['position', 'destinatario', 'mensaje'];
  displayedColumns: string[] = [ 'destinatario', 'mensaje','fecha'];

  //username:string='lalamonte'
  username:string = ''

  constructor(private fb: FormBuilder,private apiMemoService:ApiMemoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "[]"
    //test apiMemoV2
    this.inboxMemosSubscription = this.apiMemoService.getAllMessageSent(this.username).subscribe((data: any[]) => {
      console.log('esto es data antes de hacer el if',data[0]);
      //ver de hacer un if por erro de que no existe mensaje escrito cuando no tengo el token
      if(data[0]){
        this.outBoxMemosV2=data[0].mensajeEscrito
        this.showTable=true
        console.log(this.outBoxMemosV2)
      }
      
      //console.log(this.outBoxMemosV2[0].mensajeEscrito)
    })
    //funciona con apiMemo
    /* this.inboxMemosSubscription = this.apiMemoService.getAllMessageSent(this.username).subscribe((data: Inbox[]) => {
      this.outBoxMemos=data
      console.log(this.outBoxMemos)
    }) */
  }


  

}

/**
 * TODO: hacer que muestre los mensajes mas recientes enviados
 */