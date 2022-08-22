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
  outBoxMemosV2: any[] = []
  inboxMemosSubscription!: Subscription;
  showTable: boolean = false
  displayedColumns: string[] = ['destinatario', 'mensaje', 'fecha'];
  username: string = ''
  endTable: any[] = []

  constructor(private fb: FormBuilder, private apiMemoService: ApiMemoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "[]"

    this.inboxMemosSubscription = this.apiMemoService.getAllMessageSent(this.username).subscribe((data: any[]) => {
      if (data[0]) {
        this.outBoxMemosV2 = data[0].mensajeEscrito
        this.showTable = true
      }
      this.buildTable()
    })
  }

  //Esta funcion toma la tabla que recibo del back y arma la tabla definitiva
  //agrupando los username para un mismo texto y fecha de creacion de mensaje
  buildTable() {
    for (let i = 0; i < this.outBoxMemosV2.length; i++) {
      for (let j = i + 1; j < this.outBoxMemosV2.length; j++) {
        if (this.outBoxMemosV2[i].text == this.outBoxMemosV2[j].text && this.outBoxMemosV2[i].createdAt == this.outBoxMemosV2[j].createdAt) {
          this.outBoxMemosV2[j].destinatario.username = this.outBoxMemosV2[i].destinatario.username.concat([', '], this.outBoxMemosV2[j].destinatario.username)
          this.outBoxMemosV2.splice(i, 1, 'a');
        }
      }
    }
    this.endTable = this.outBoxMemosV2.filter(this.isDefined)
  }

  isDefined(argument: string | undefined): argument is string {
    return argument !== 'a'
  }


}
