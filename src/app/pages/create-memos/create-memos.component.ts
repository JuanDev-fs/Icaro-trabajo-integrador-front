import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewMessage } from 'src/app/newMessage.interface';
import { ApiMemoService } from 'src/app/service/api-memo.service';
import { UsuariosRx } from 'src/app/usuariosRx.interface';

@Component({
  selector: 'app-create-memos',
  templateUrl: './create-memos.component.html',
  styleUrls: ['./create-memos.component.css']
})
export class CreateMemosComponent implements OnInit {

  messageArray: any[] = []
  usuarios: UsuariosRx[] = [];
  usuariosDepurados: any[] = [];
  usuariosSubscription!: Subscription;
  usernameSenderSubscription!: Subscription;
  senderId: number = 0
  usernameSender: string = ' '

  miDashboard: FormGroup = this.fb.group({
    'receiverId': [, Validators.required],
    'text': ['', [Validators.required, Validators.maxLength(140)]]
  })

  constructor(private fb: FormBuilder, private apiMemoService: ApiMemoService) { }

 
  ngOnInit(): void {

    //traigo el username del localstorage
    this.usernameSender = localStorage.getItem('username') || "[]"

    //traigo lista usuarios de la api para hacer menu de destinatarios
    this.usuariosSubscription = this.apiMemoService.getAllUsers().subscribe((data: UsuariosRx[]) => {
      this.usuarios = data
    })
  }

  //valida el campo, si tiene error o fue tocado
  validar(campo: string) {
    return this.miDashboard.controls[campo]?.errors && this.miDashboard.controls[campo]?.touched
  }

  sentMemo() {
    // si el formulario tiene errores lo marca y sale
    if (this.miDashboard.invalid) {
      this.miDashboard.markAllAsTouched();
      return;
    }

    //sino busca senderID
    this.usuarios.forEach((element) => {
      if (element.username == this.usernameSender) {
        this.senderId = element.id
      }
    })

    this.miDashboard.value.receiverId.forEach((rxId: number) => {
      //Armo mensaje
      let newMessage: NewMessage = {
        senderId: this.senderId,
        receiverId: rxId,
        text: this.miDashboard.value.text
      }
      //creo array de mensajes para hacer un bulkCreate en el back
      this.messageArray.push(newMessage)
    });

    //envio el array de mensajes a la api
    this.usernameSenderSubscription = this.apiMemoService.createNewMessage(this.usernameSender, this.messageArray).subscribe()
    //reseteo banderas del formulario
    this.miDashboard.reset();
  }


}

