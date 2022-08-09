import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiMemoService } from 'src/app/service/api-memo.service';
import { Usuarios } from 'src/app/usuarios.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //declaro un objeto para poder usarlo para seleccionar paises y ciudades
  countries: any[] = [
    { country: "Argentina", cities: ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"] },
    { country: "Brasil", cities: ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahía", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso del Sur", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Río de Janeiro", "Río Grande del Norte", "Río Grande del Sur", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"] },
    { country: "Chile", cities: ["Tarapacá", "Antofagasta", "Atacama", "Arica y Parinacota", "Aysén", "Bío-Bío", "Coquimbo", "La Araucanía", "Los Lagos", "Los Ríos", "Magallanes", "Maule", "Metropolitana de Santiago", "Ñuble", "O’Higgins", "Valparaíso"] },
    { country: "Uruguay", cities: ["Artigas", "Salto", "Rivera", "Paysandú", "Tacuarembó", "Rio Negro", "Cerro Largo", "Treinta y Tres", "Durazno", "Soriano", "Flores", "Florida", "Lavalleja", "Rocha", "Colonia", "San José", "Canelones", "Maldonado", "Montevideo"] },
    { country: "Paraguay", cities: ["Alto Paraguay", "Alto Paraná", "Amambay", "Boquerón", "Caaguazú", "Caazapá", "Canindeyú", "Central", "Concepción", "Cordillera", "Guairá", "Itapúa", "Misiones", "Ñeembucú", "Paraguarí", "Presidente Haris", "San Pedro"] },
    { country: "Bolivia", cities: ["Beni", "Chuquisaca", "Cochabamba", "La Paz", "Oruro", "Pando", "Potosí", "Santa Cruz", "Tarija"] },
    { country: "Perú", cities: ["Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"] },
    { country: "Colombia", cities: ["Amazonas", "Antioquía", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"] },
    { country: "Venezuela", cities: ["Acarigua", "Barcelona", "Barinas", "Barquisimeto", "Cabimas", "Caracas", "Caripito", "Carora", "Carúpano", "Ciudad Bolívar", "Ciudad Guayana", "Coro", "Cumaná", "El Tigre", "Guanare", "Guasdualito", "La Guaira", "Los Teques", "Maracaibo", "Maracay", "Maturín", "Mérida", "Puerto Cabello", "Puerto La Cruz", "Punto Fijo", "San Antonio", "San Carlos", "San Cristóbal", "San Felipe", "San Fernando", "San Juan de los Morros", "Trujillo", "Tucupita", "Valencia", "Valera", "Valle de la Pascua"] }
  ]

  miFormulario:FormGroup=this.fb.group({
    'lastName':[,[Validators.required,Validators.minLength(3)]],
    'firstName':[,[Validators.required,Validators.minLength(3)]],
    'username':[,[Validators.required,Validators.minLength(5)]],
    'password':[,[Validators.required,Validators.minLength(8)]],
    'confirmPassword':[,[Validators.required,Validators.minLength(8)]],
    'country':[,Validators.required],
    'city':[,Validators.required]
  })



  ciudades =this.countries[0].cities
  ciudades2:any[]=[]
  usuario:any[]=[]

  usuarios:Usuarios[]=[]
  usuariosSubscripcion!: Subscription;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private apiMemoService:ApiMemoService) { }

  ngOnInit(): void {
  }

  /* ngOnDestroy() {
    this.usuariosSubscripcion.unsubscribe();
  } */

  //test
 mostrar(){
  console.log(this.countries);
  console.log(this.countries[0].cities)
  console.log(this.ciudades);
 }
 mostrar2(){
  console.log(this.miFormulario);
  console.log(this.miFormulario.value);
 }


 guardar(indice1: any){
  console.log(indice1);
  this.ciudades2 =this.countries[indice1].cities
  console.log(this.ciudades2);
 }


 //validaciones

 validar(campo:string){
  return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched
}

 guardar2(){
  if(this.miFormulario.invalid){
    this.miFormulario.markAllAsTouched();
    return;
  }
  //this.usuario.push(this.miFormulario.value)//guardo usuarios en array
  //console.log(this.usuario);
  
  console.log(this.miFormulario.value);
  let newUser:Usuarios={
    lastName:this.miFormulario.value.lastName,
    firstName:this.miFormulario.value.firstName,
    username:this.miFormulario.value.username,
    password:this.miFormulario.value.password,
    country:this.miFormulario.value.country,
    city:this.miFormulario.value.city
  }
  //console.log(newUser);
  
  //con esto creo el mensaje pero no manejo la respuesta negativa del backend
  this.apiMemoService.createUser(newUser).subscribe(data=>{
    console.log(data);
  })
  


  /* this.apiMemoService.createUser(this.miFormulario.value).subscribe(data=>{
    console.log(data);
  }) */
  
  this.miFormulario.reset();
  console.log('formulario enviado');
  this.openSnackBar()
  
  }

  openSnackBar(){
    this.snackBar.open('Formulario registrado con exito','cerrar')
  }

}
