import { Component, OnInit } from '@angular/core';
import { Aparatos } from '../layout/api/aparatos';
import { ClientesService } from '../layout/service/clientes.service';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AparatosService } from '../layout/service/aparatos.service';

@Component({
  selector: 'app-aparatos',
  templateUrl: './aparatos.component.html',
  styleUrls: ['./aparatos.component.scss'],
  providers: [AparatosService, MessageService]
})
export class AparatosComponent implements OnInit {

  aparatosDialog: boolean = false;

  deleteAparatoDialog: boolean = false;

  deleteAparatosDialog: boolean = false;

  aparatos: Aparatos[] = [];

  aparato: Aparatos = {};

  selectedAparatos: Aparatos[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  types: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private aparatoService: AparatosService, private messageService: MessageService) { }

  ngOnInit(){
    this.aparatoService.getAparatos().then(data => this.aparatos = data);

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo' },
    ]; 

    this.types = [
      { label: 'Pesas libres', value: 'Pesas libres'},
      { label: 'Maquina', value: 'Maquina'}
    ]
  }

  openNew(){
    this.submitted = false;
    this.aparatosDialog = true;
  }

  hideDialog() {
    this.aparatosDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.aparatos.length; i++) {
        if (this.aparatos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}

