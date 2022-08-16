import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewMessage } from 'src/app/newMessage.interface';
import { ApiMemoService } from 'src/app/service/api-memo.service';
import { MessageService } from 'src/app/service/message.service';
import { UsuariosRx } from 'src/app/usuariosRx.interface';

@Component({
  selector: 'app-create-memos',
  templateUrl: './create-memos.component.html',
  styleUrls: ['./create-memos.component.css']
})
export class CreateMemosComponent implements OnInit {

  messageArray:any[]=[]
  usuarios:UsuariosRx[]=[];
  usuariosDepurados:any[]=[];
  usuariosSubscription!:Subscription;
  usernameSenderSubscription!:Subscription;
  //usernameSender:string='lalamonte' //id:6
  senderId:number=0
  usernameSender:string=' ' //id:6

  miDashboard:FormGroup=this.fb.group({
    'receiverId':[,Validators.required],
    'text':['',[Validators.required,Validators.maxLength(140)]]
  })

  constructor(private fb: FormBuilder,private apiMemoService:ApiMemoService, private messageService: MessageService) { }

  //al inicio hago una peticion de todos los usuarios a la base de datos y los guardo
  ngOnInit(): void {
    this.usernameSender = localStorage.getItem('username') || "[]"

    this.usuariosSubscription = this.apiMemoService.getAllUsers().subscribe((data: UsuariosRx[]) => {
      this.usuarios=data
      console.log(this.usuarios)
      console.log('useranamesendedr',this.usernameSender);
      
    })
  }

  //validar
  validar(campo:string){
    //console.log(this.miDashboard.controls['text'].errors);
    
    return this.miDashboard.controls[campo]?.errors && this.miDashboard.controls[campo]?.touched
  }

  //problema puede enviar menos mensajes que los que elijo
  enviarMemo(){

    if(this.miDashboard.invalid){
      this.miDashboard.markAllAsTouched();
      return;
    }
    //console.log(this.miDashboard.value.text.length);
    //console.log(this.miDashboard.value.receiverId)

    /* for (let i = 0; i < this.miDashboard.value.receiverId.length; i++) {
      console.log(this.miDashboard.value.receiverId[i]);
      let newMessage:NewMessage={
        receiverId:this.miDashboard.value.receiverId[i],
        text:this.miDashboard.value.text
      }
      console.log(newMessage);
      
      this.usernameSenderSubscription = this.apiMemoService.createNewMessage(this.usernameSender,newMessage).subscribe(data=>{
        console.log(data);
      })

    } */

    //buscar senderID
    this.usuarios.forEach((element)=>{
      if(element.username == this.usernameSender){
        this.senderId=element.id
      }
    })
    console.log(this.senderId);
    

    this.miDashboard.value.receiverId.forEach((rxId: number) => {
      console.log(rxId);
      
      let newMessage:NewMessage={
        senderId:this.senderId,
        receiverId:rxId,
        text:this.miDashboard.value.text
      }

      this.messageArray.push(newMessage)
    });

    console.log(this.messageArray);
    
    this.usernameSenderSubscription = this.apiMemoService.createNewMessage(this.usernameSender,this.messageArray).subscribe(data=>{
        console.log(data);
      })

      /* this.usernameSenderSubscription = this.apiMemoService.createNewMessage(this.usernameSender,newMessage).subscribe(data=>{
        console.log(data);
      }) */
      //console.log(newUser);

    this.miDashboard.reset();
    console.log('formulario enviado');

    this.messageService.add(`Create Memos Component: Create new memos`);
  }


}

/**
 * TODO:
 * CORREGIR PROBLEMA AL TRATAR DE ENVIAR MULTIPLES MENSAJES, NO MANDA TODOS
 * 
 */



/**
 * 
 * 
 */