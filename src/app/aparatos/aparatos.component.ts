import { Component, OnInit } from '@angular/core';
import { Aparatos } from '../layout/api/aparatos';
import { AparatosService } from '../layout/service/aparatos.service';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-aparatos',
  templateUrl: './aparatos.component.html',
  styleUrls: ['./aparatos.component.scss'],
  providers: [AparatosService, MessageService]
})
export class AparatosComponent implements OnInit {
  public response;

  aparatosDialog: boolean = false;

  deleteAparatoDialog: boolean = false;

  editAparatoDialog: boolean = false;

  deleteAparatosDialog: boolean = false;

  aparatos: Aparatos[] = [];

  aparato: Aparatos = {};

  selectedAparatos: Aparatos[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  types: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private aparatoService: AparatosService, private messageService: MessageService) { }

  ngOnInit() {
    this.getDataFromService();

    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },
      { field: 'birthdate', header: 'Fecha de nacimiento' },
      { field: 'memebership', header: 'Membresia' },
      { field: 'status', header: 'Status' },
      { field: 'contact_name', header: 'Contacto de emergencia' },
      { field: 'contact_phone', header: 'Teléfono de contacto de emergencia' },
    ];

    this.types = [
      { label: 'Pesas libres', value: 'Pesas libres' },
      { label: 'Máquina', value: 'Máquina' },
    ];
  }

  private getDataFromService() {
    this.aparatoService.getAparatos().subscribe((res: any) => {
      console.log(res);
      this.aparatos = [...this.aparatos, ...res];
    });
  }

  addAparato() {
    this.aparatoService.addAparato(this.aparato).subscribe(
      (data) => {
        this.response = data;
      },
    );
    this.getDataFromService();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Cliente creado',
      life: 3000,
    });
  }

  openNew() {
    this.submitted = false;
    this.aparatosDialog = true;
  }

  openEdit(aparato: Aparatos) {
    this.editAparatoDialog = true;
    Object.assign(this.aparato, aparato);
  }

  deleteAparato(aparato: Aparatos) {
    console.log('Delete', aparato);
    this.deleteAparatoDialog = true;
    Object.assign(this.aparato, aparato);
  }

  confirmDeleteCliente(aparato: Aparatos) {
    console.log('Delete confirm', aparato);
    this.aparatoService.deleteAparato(aparato.id).subscribe(
      (data) => {
        this.response = data;
      },
    );
    this.getDataFromService();
  }
  confirmEditAparato(aparato: Aparatos) {
    console.log('Edit confirm', aparato);
    this.aparatoService.editAparato(aparato).subscribe(
      (data) => {
        this.response = data;
      }
    );
    this.getDataFromService();
    this.aparatosDialog = false;
  }

  deleteSelectedAparatos() {
    this.deleteAparatosDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  hideDialog() {
    this.aparatosDialog = false;
    this.submitted = false;
  }
}
