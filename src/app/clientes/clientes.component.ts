import { Component, OnInit } from '@angular/core';
import { Clientes } from '../layout/api/clientes';
import { ClientesService } from '../layout/service/clientes.service';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClientesService, MessageService],
})
export class ClientesComponent implements OnInit {
  clientesDialog: boolean = false;

  deleteClienteDialog: boolean = false;

  deleteClientesDialog: boolean = false;

  clientes: Clientes[] = [];
  editClienteDialog: boolean = false;
  public response;

  public cliente = {
    id: '',
    name: '',
    birthDate: '',
    code: '',
    memebership: '',
    status: '',
    contact_name: '',
    contact_phone: '',
  };

  selectedClientes: Clientes[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  memberships: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private clientesService: ClientesService,
    private messageService: MessageService
  ) {}

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

    this.memberships = [
      { label: 'Estudiante (Mensual)', value: 'Mensual' },
      { label: 'Mensual', value: 'Mensual' },
      { label: 'Trimestral', value: 'Trimestre' },
      { label: 'Semestral', value: 'Semestre' },
      { label: 'Anual', value: 'Anual' },
    ];
  }

  private getDataFromService() {
    this.clientesService.getClientes().subscribe((res: any) => {
      console.log(res);
      this.clientes = [...this.clientes, ...res];
    });
  }

  addCliente() {
    this.clientesService.addCliente(this.cliente).subscribe(
      (data) => {
        this.response = data;
      },
      () => {
        this.getDataFromService();
      }
    );

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Cliente creado',
      life: 3000,
    });
  }

  openNew() {
    this.submitted = false;
    this.clientesDialog = true;
  }

  openEdit(cliente: Clientes) {
    this.editClienteDialog = true;
    Object.assign(this.cliente, cliente);
  }

  deleteCliente(cliente: Clientes) {
    console.log('Delete', cliente);
    this.deleteClienteDialog = true;
    Object.assign(this.cliente, cliente);
  }

  confirmDeleteCliente(cliente: Clientes) {
    console.log('Delete confirm', cliente);
    this.clientesService.deleteCliente(cliente.id).subscribe(
      (data) => {
        this.response = data;
      },
      () => {
        this.getDataFromService();
      }
    );
  }
  confirmEditCliente(cliente: Clientes) {
    console.log('Edit confirm', cliente);
    this.clientesService.editCliente(cliente).subscribe(
      (data) => {
        this.response = data;
      },
      () => {
        this.getDataFromService();
      }
    );
  }

  deleteSelectedClientes() {
    this.deleteClientesDialog = true;
  }

  /*
  deleteCliente(cliente: Clientes) {
    this.deleteClienteDialog = true;
    this.clientes = { ...cliente };
  }

  confirmDeleteSelected() {
    this.deleteClienteDialog = false;
    this.clientes = this.clientes.filter(
      (val) => !this.selectedClientes.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedClientes = [];
  }

  confirmDelete() {
    this.deleteClienteDialog = false;
    this.clientes = this.clientes.filter((val) => val.id !== this.cliente.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Clientes Deleted',
      life: 3000,
    });
    this.cliente = {};
  }
  */

  hideDialog() {
    this.clientesDialog = false;
    this.submitted = false;
  }

  /*
  saveCliente() {
    this.submitted = true;

    if (this.cliente.name?.trim()) {
      if (this.cliente.id) {
        // @ts-ignore
        this.cliente.membership = this.cliente.membership.value
          ? this.cliente.membership.value
          : this.cliente.membership;
        this.clientes[this.findIndexById(this.cliente.id)] = this.cliente;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clientes Updated',
          life: 3000,
        });
      } else {
        this.cliente.id = this.createId();
        this.cliente.code = this.createCode();
        // @ts-ignore
        this.cliente.membership = this.cliente.membership.value;
        this.cliente.status = 'Activa';
        this.clientes.push(this.cliente);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clientes Created',
          life: 3000,
        });
      }

      this.clientes = [...this.clientes];
      this.clientesDialog = false;
      this.cliente = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].id === id) {
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

  createCode(): string {
    let code = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  */
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
