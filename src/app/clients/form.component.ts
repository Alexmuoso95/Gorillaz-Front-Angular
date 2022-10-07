import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router , ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public client : Client = new Client();
  public title : string = "Crear Cliente";
  private message : string ;
  
  constructor(private clientService: ClientService, private router : Router, private activatedRoute : ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarClient();
  }

  public cargarClient() : void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clientService.getClient(id).subscribe((client) => this.client = client)
      }
    })
  }

  public create() : void{
    this.clientService.createClient(this.client).subscribe(client =>{
      swal.fire('Nuevo cliente' , `Cliente ${this.client.name} creado con exito!`, 'success');
      this.router.navigate(['/clients']);
    },
    err => {
      this.message = err.message;
      console.error('Coidgo del error desde el back : ' + err.status);
      console.error(err.message);
    }
    );
  }
  public update() : void{
    this.clientService.updateClient(this.client)
      .subscribe(client =>{
        this.router.navigate(['/clients']);
        swal.fire('Cliente Actualizado' , `Cliente ${this.client.name} actualizado con exito!`, 'success');
    });
  }
  public delete() : void{
    this.clientService.deleteClient(this.client.id)
      .subscribe(client =>{
        this.router.navigate(['/clients']);
        swal.fire('Cliente Eliminado' , `Cliente ${this.client.name} eliminado con exito!`, 'success');
    });
  }
}
