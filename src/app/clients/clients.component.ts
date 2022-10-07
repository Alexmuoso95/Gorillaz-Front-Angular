import { Component, OnInit } from '@angular/core';
import { Client } from './client'
import { ClientService } from './client.service';
import  swall from 'sweetalert2';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit {

  clients : Client[] ;
  
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
      );
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

