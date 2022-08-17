import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMemoService } from 'src/app/service/api-memo.service';
import { GetUsersService } from 'src/app/service/get-users.service';
import { UsuarioLogin } from 'src/app/usuariosLogin.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  miFormularioLogin:FormGroup=this.fb.group({
    'userName':[,[Validators.required/* ,Validators.minLength(5) */]],
    'password':[,[Validators.required/* ,Validators.minLength(8) */]]
  })

  constructor(
    private fb: FormBuilder,
    private apiMemoService:ApiMemoService,
    private router:Router,
    private getUsersService:GetUsersService
    ) { }

  ngOnInit(): void {
  }

  //validaciones
  validar(campo:string){
    return this.miFormularioLogin.controls[campo]?.errors && this.miFormularioLogin.controls[campo]?.touched
  }

  guardar(){
    if(this.miFormularioLogin.invalid){
      this.miFormularioLogin.markAllAsTouched();
      return;
    }
    console.log(this.miFormularioLogin.value)
    let user:UsuarioLogin = {
      username:this.miFormularioLogin.value.userName,
      password:this.miFormularioLogin.value.password
    }

    this.apiMemoService.login(user).subscribe(data=>{
      if(data.token){
        console.log(data.token);
        localStorage.setItem('username',user.username)//Guardo username
        this.getUsersService.userNameToolbar = user.username
        //this.getUsersService.opened = true
        localStorage.setItem('token',data.token)
        console.log('esto es data',data.message)
        this.miFormularioLogin.reset();
        console.log('formulario enviado');

        this.router.navigate(['inbox'])
      }
      //console.log(data.token);
    })
    //this.miFormularioLogin.reset();
    //console.log('formulario enviado');
    //console.log(this.miFormularioLogin.value)
    }


}