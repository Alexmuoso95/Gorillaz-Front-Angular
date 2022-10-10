import { Component, OnInit } from '@angular/core';
import { Client } from './client'
import { ClientService } from './client.service';
import  swall from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit {

  clients : Client[] ;
  paginator : any;
  
  constructor(private clientService : ClientService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page : number = +params.get('page');
      if(!page){
        page=0;
      }
      this.clientService.getClientsPage(page).pipe(
        ).subscribe(response =>{
          this.clients = response.content as Client [];
          this.paginator = response;
        } );
    })
  }

  delete(client : Client ): void {
    swall.fire({
      title: 'Estas segurisimo que quieres Eliminarlo ?',
      text: `No se podra recuperar la informacion de ${client.name} ${client.lastName} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#deleted33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
       this.clientService.deleteClient(client.id).subscribe(response => {
        this.clients = this.clients.filter(cli => cli !== client)
        swall.fire('Cliente eliminado!'),
        `Cliente ${client.name} eliminado con exito.`,
        'success'
       })
       }
    })
  }
}

