import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


import { Subscription } from 'rxjs';
import { Inbox } from 'src/app/inbox.interface';
import { InboxArray } from 'src/app/inboxArray.interface';
import { ApiMemoService } from 'src/app/service/api-memo.service';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  dataSource:any;
  messageArray:InboxArray[]=[];
 // messageArray:any[]=[];
  inboxMemosV2:any[]=[];
  inboxMemos:Inbox[]=[];
  inboxMemosSubscription!:Subscription;

  

  displayedColumns: string[] = ['fecha', 'remitente', 'mensaje'];

  username:string='supermancito'

  constructor(private fb: FormBuilder,private apiMemoService:ApiMemoService) { }

  ngOnInit(): void {
    //test apiMemoV2
    this.inboxMemosSubscription = this.apiMemoService.getAllMessageInbox(this.username).subscribe((data: any[]) => {
     //this.inboxMemosV2=data
      this.armarTabla(data)
    })


    //funciona para apiMemo
    /* this.inboxMemosSubscription = this.apiMemoService.getAllMessageInbox(this.username).subscribe((data: Inbox[]) => {
      this.inboxMemos=data
      console.log(this.inboxMemos)
    }) */
  }




  armarTabla(arrayData:any[]){
    for (let i = 0; i < arrayData.length; i++) {
      for (let j = 0; j < arrayData[i].mensajeEscrito.length; j++) {
        let newMessageItem:any={
          remitente:arrayData[i].username,
          text:arrayData[i].mensajeEscrito[j].text,
          createdAt:arrayData[i].mensajeEscrito[j].createdAt
        }
        this.messageArray.push(newMessageItem)
      }
    }
    console.log(this.messageArray); 
    this.dataSource = new MatTableDataSource<InboxArray>(this.messageArray)
  }
  


  mostrar(){
  console.log(this.messageArray);
  }
}

/**
 * TODO: hacer que muestre los mensajes nuevos
 * acomodar los mensajes por fecha reciente
 */
