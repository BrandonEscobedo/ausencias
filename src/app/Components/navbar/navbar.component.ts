import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
@Component({
    selector: 'app-navbar',
    imports: [Menubar, RouterOutlet],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Solicitudes',
                icon: 'pi pi-home',
                routerLink: '/solicitudes',
                items: [
                    {
                        label: 'Solicitudes pendientes',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: '/solicitudesPendientes'
                    },

                ]
            },

            {
                label: 'Crear Solicitud',
                icon: 'pi pi-star',
                routerLink: '/crearSolicitud'
            },
            {
                label: 'Chat',
                icon: 'pi pi-star',
                routerLink: '/chat'
            },
            {
                label: 'Mis solicitudes',
                icon: 'pi pi-star',
                routerLink: '/crearSolicitud'
            },
        ]
    }
}
