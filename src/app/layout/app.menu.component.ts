import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            /* {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/adminDashboard'] }
                ]
            }, */
            {
                label: 'Administrar gimnsasio',
                items: [
                    { label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: ['/adminDashboard/clientes'] },
                    { label: 'Empleados', icon: 'pi pi-fw pi-bookmark', routerLink: ['/adminDashboard/empleados'] },
                    { label: 'Aparatos', icon: 'pi pi-fw pi-check-square', routerLink: ['/adminDashboard/aparatos'] },
                ]
            }
        ];
    }
}
