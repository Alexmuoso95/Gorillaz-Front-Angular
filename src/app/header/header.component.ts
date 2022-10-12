import { Component } from "@angular/core"; 
import { AuthService } from "../users/auth.service";
import swall from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent {
    title: string = "Menu";

    constructor(public authService : AuthService, private router : Router){
    
    }

    logout(): void{
        this.authService.logout();
        swall.fire('Adios' , 'Has cerrado Sesion', 'success' );
        this.router.navigate(['/login']);
    }
}