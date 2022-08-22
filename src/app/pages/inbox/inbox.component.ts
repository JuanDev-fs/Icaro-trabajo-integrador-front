import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { InboxArray } from 'src/app/inboxArray.interface';
import { ApiMemoService } from 'src/app/service/api-memo.service';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  dataSource: any;
  messageArray: InboxArray[] = [];
  inboxMemosSubscription!: Subscription;
  inboxMemosSubscription2!: Subscription;
  displayedColumns: string[] = ['remitente', 'mensaje', 'fecha'];
  username: string = ''


  constructor(private fb: FormBuilder, private apiMemoService: ApiMemoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "[]"

    this.inboxMemosSubscription = this.apiMemoService.getAllMessageInbox(this.username).subscribe((data: any[]) => {
      if (data.length > 0) {
        this.buildMessageTable(data)
      }
    })
  }

  buildMessageTable(arrayData: any[]) {
    for (let i = 0; i < arrayData.length; i++) {
      for (let j = 0; j < arrayData[i].mensajeEscrito.length; j++) {
        let newMessageItem: any = {
          remitente: arrayData[i].username,
          text: arrayData[i].mensajeEscrito[j].text,
          createdAt: arrayData[i].mensajeEscrito[j].createdAt,
          read: arrayData[i].mensajeEscrito[j].read,
          messageId: arrayData[i].mensajeEscrito[j].id,
        }
        this.messageArray.push(newMessageItem)
      }
    }
    this.dataSource = new MatTableDataSource<InboxArray>(this.messageArray)
  }

  //click--> put read=false To read=true
  markReadMessage(messageId: number, read: boolean) {
    if (read == false) {
      //mando el put al back
      this.inboxMemosSubscription2 = this.apiMemoService.updateReadMessageStatus(this.username, messageId).subscribe()
    }
  }

}
