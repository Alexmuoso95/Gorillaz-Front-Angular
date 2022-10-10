import { Component, OnInit } from '@angular/core';
import { User } from './user'
import  swall from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService
 } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title : string = 'Iniciar Sesion';
  user : User ;
  constructor(private router : Router, private authService : AuthService) { 
    this.user = new User();
  }
  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
    if(this.user.name == null || this.user.password ==null){
      swall.fire('Error iniciando sesion', 'Usuario o Contrasena estan vacios!', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(u => {
      this.router.navigate(['/clients/page',0]);
      let payload = JSON.parse(atob(u.access_token.split(".")[1]));
      console.log(payload);
      swall.fire('Inicio de Sesion', `Hola ${payload.user_name}` + ' has iniciado sesion con exito!', 'success')
    })
  }
}
