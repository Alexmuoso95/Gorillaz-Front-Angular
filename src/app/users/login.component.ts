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

  user : User ;
  constructor(private router : Router, private authService : AuthService) { 
    this.user = new User();
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swall.fire(`Hola ${this.authService.getUser.name}` + ' ya has iniciado sesion', '', 'info')
      this.router.navigate(['/clients/page/',0])
    }
  }

  login(){
    if(this.user.name == null || this.user.password ==null){
      swall.fire('Error iniciando sesion', 'Usuario o Contrasena estan vacios!', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response =>{
      console.log(response);
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      swall.fire(`Has iniciado sesion`,'', 'success')
      this.router.navigate(['/clients/page',0]);
    }, err => {
      if(err.status == 401 || err.status == 400){
        swall.fire('Error al iniciar sesion' , 'Usuario o  contraseña Incorrectas!', 'error' );
      }
    })
  }
}
