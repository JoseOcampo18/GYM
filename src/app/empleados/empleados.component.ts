import { Component, OnInit } from '@angular/core';
import { Empleados } from '../layout/api/empleados';
import { EmpleadosService } from '../layout/service/empleados.service';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [EmpleadosService, MessageService]
})
export class EmpleadosComponent implements OnInit {

  empleadosDialog: boolean = false;

  deleteEmpleadoDialog: boolean = false;

  deleteEmpleadosDialog: boolean = false;

  empleados: Empleados[] = [];

  empleado: Empleados = {};

  selectedEmpleados: Empleados[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private empleadosService: EmpleadosService, private messageService: MessageService) { }

  ngOnInit(){
    this.empleadosService.getEmpleados().then(data => this.empleados = data);

    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' },,
      { field: 'birthdate', header: 'Fecha de nacimiento' },
    ]; 
  }

  openNew(){
    this.empleado = {};
    this.submitted = false;
    this.empleadosDialog = true;
  }

  deleteSelectedEmpleados() {
    this.deleteEmpleadosDialog = true;
  }

  editEmpleado(empleado: Empleados) {
    this.empleado = { ...empleado };
    this.empleadosDialog = true;
  }

  deleteEmpleado(empleado: Empleados) {
    this.deleteEmpleadoDialog = true;
    this.empleado = { ...empleado };
  }

  confirmDeleteSelected() {
    this.deleteEmpleadoDialog = false;
    this.empleados = this.empleados.filter(val => !this.selectedEmpleados.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Deleted', life: 3000 });
    this.selectedEmpleados = [];
  }

  confirmDelete() {
    this.deleteEmpleadoDialog = false;
    this.empleados = this.empleados.filter(val => val.id !== this.empleado.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Deleted', life: 3000 });
    this.empleado = {};
  }

  hideDialog() {
    this.empleadosDialog = false;
    this.submitted = false;
  }

  saveEmpleado() {
    this.submitted = true;

    if (this.empleado.name?.trim()) {
        if (this.empleado.id) {
            // @ts-ignore
            this.empleados[this.findIndexById(this.empleado.id)] = this.empleado;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Updated', life: 3000 });
        } else {
            this.empleado.id = this.createId();
            this.empleado.code = this.createCode();
            // @ts-ignore
            this.empleados.push(this.empleado);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado Created', life: 3000 });
        }

        this.empleados = [...this.empleados];
        this.empleadosDialog = false;
        this.empleado = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.empleados.length; i++) {
        if (this.empleados[i].id === id) {
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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

}
