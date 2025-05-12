import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'app-navbar',
    imports: [Menubar, RouterOutlet],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    items: MenuItem[] | undefined;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        const role = this.authService.getRole();

        this.items = [
            {
                label: 'Solicitudes',
                icon: 'pi pi-home',
                routerLink: '/solicitudes',
            },
            {
                label: 'Crear Solicitud',
                icon: 'pi pi-star',
                routerLink: '/crearSolicitud'
            },
            {
                label: 'Generar Token',
                icon: 'pi pi-star',
                routerLink: '/generarToken'
            },

        ]

        if (role === 'Empleado') {
         
            this.items = this.items.filter(item =>
                item.label === 'Crear Solicitud' 
            );
        }
        if (role === 'Gerente') {
            this.items = new Array<MenuItem>();

        }

    }
}
