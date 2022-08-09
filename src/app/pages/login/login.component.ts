import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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
    this.miFormularioLogin.reset();
    console.log('formulario enviado');
    console.log(this.miFormularioLogin.value)
    }


}