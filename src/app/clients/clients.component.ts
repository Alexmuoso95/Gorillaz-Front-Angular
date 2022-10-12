import { Component, OnInit } from '@angular/core';
import { Client } from './client'
import { ClientService } from './client.service';
import { ActivatedRoute } from '@angular/router';

import  swall from 'sweetalert2';
//import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients : Client[] ;
  paginator : any;
  
  closeResult : string;

  constructor(private clientService : ClientService, private activatedRoute : ActivatedRoute,private activeModal: NgbActiveModal) { }

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
      title: `Eliminar a ${client.name} ${client.lastName}  ? `,
      text: 'No se podra recuperar la informacion!',
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
  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}

