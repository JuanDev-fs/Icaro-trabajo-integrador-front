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
  inboxMemosSubscription2!:Subscription;
  

  // displayedColumns: string[] = ['fecha', 'remitente', 'mensaje'/* ,'id' */];
  displayedColumns: string[] = ['remitente', 'mensaje', 'fecha'/* ,'id' */];

  //username:string='lalamonte'
  username:string = ''
  

  constructor(private fb: FormBuilder,private apiMemoService:ApiMemoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "[]"

    this.inboxMemosSubscription = this.apiMemoService.getAllMessageInbox(this.username).subscribe((data: any[]) => {
      console.log('log de data mensajes recibidos',data)
      if(data.length>0){
        this.armarTabla(data)
      }
       
     })
 




    //test apiMemoV2
    /* this.inboxMemosSubscription = this.apiMemoService.getAllMessageInbox(this.username).subscribe((data: any[]) => {
     //this.inboxMemosV2=data
      this.armarTabla(data)
    }) */


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
          createdAt:arrayData[i].mensajeEscrito[j].createdAt,
          read:arrayData[i].mensajeEscrito[j].read,
          messageId:arrayData[i].mensajeEscrito[j].id,
        }
        this.messageArray.push(newMessageItem)
      }
    }
    console.log(this.messageArray); 
    this.dataSource = new MatTableDataSource<InboxArray>(this.messageArray)
  }
  

  //solo para test de mostrar array de mensajes creados
  mostrar(){
  console.log(this.messageArray);
  }


  //click--> put read=false To read=true
  markReadMessage(messageId:number, read:boolean){
    if(read==false){
      //mando el put
      //desabilitado para test interno
      this.inboxMemosSubscription2=this.apiMemoService.updateReadMessageStatus(this.username,messageId).subscribe()
    }
    console.log(messageId, read);
  }


//Destruyo las subscripciones al salir
  /* ngOnDestroy():void{
    this.inboxMemosSubscription.unsubscribe();
   // this.inboxMemosSubscription2.unsubscribe();
  } */
}


//sockets
//