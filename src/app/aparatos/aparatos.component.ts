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
    this.aparato = {};
    this.submitted = false;
    this.aparatosDialog = true;
  }

  deleteSelectedAparatos() {
    this.deleteAparatosDialog = true;
  }

  editAparato(aparato: Aparatos) {
    this.aparato = { ...aparato };
    this.aparatosDialog = true;
  }

  deleteAparato(aparato: Aparatos) {
    this.deleteAparatoDialog = true;
    this.aparato = { ...aparato };
  }

  confirmDeleteSelected() {
    this.deleteAparatoDialog = false;
    this.aparatos = this.aparatos.filter(val => !this.selectedAparatos.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Deleted', life: 3000 });
    this.selectedAparatos = [];
  }

  confirmDelete() {
    this.deleteAparatoDialog = false;
    this.aparatos = this.aparatos.filter(val => val.id !== this.aparato.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Deleted', life: 3000 });
    this.aparato = {};
  }

  hideDialog() {
    this.aparatosDialog = false;
    this.submitted = false;
  }

  saveAparato() {
    this.submitted = true;

    if (this.aparato.name?.trim()) {
        if (this.aparato.id) {
            // @ts-ignore
            this.aparato.type = this.aparato.type.value ? this.aparato.type.value : this.aparato.type;
            this.aparatos[this.findIndexById(this.aparato.id)] = this.aparato;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Updated', life: 3000 });
        } else {
            this.aparato.id = this.createId();
            // @ts-ignore
            this.aparato.type = this.aparato.type.value;
            this.aparatos.push(this.aparato);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Created', life: 3000 });
        }

        this.aparatos = [...this.aparatos];
        this.aparatosDialog = false;
        this.aparato = {};
    }
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

  createId(): number {
    let id = Date.now();
    
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}

