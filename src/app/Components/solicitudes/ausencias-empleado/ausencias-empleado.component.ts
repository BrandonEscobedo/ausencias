import { Component, inject, input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AusenciasEmpleado } from '../../../interface/solicitudes.interface';
import { SolicitudesService } from '../../../services/solicitudes.service';
@Component({
  selector: 'app-ausencias-empleado',
  imports: [TableModule, CommonModule],
  templateUrl: './ausencias-empleado.component.html',
  styleUrl: './ausencias-empleado.component.css'
})
export class AusenciasEmpleadoComponent implements OnInit {
  SolicitudesService = inject(SolicitudesService);
  idEmpleado = input<number>();
  ausencias: AusenciasEmpleado[] = [];
  ngOnInit(): void {
    this.SolicitudesService.ObtenerAusenciasEmpleado(this.idEmpleado() as number).pipe().subscribe({
      next: (data: any[]) => {
        this.ausencias = data;
        console.log(this.ausencias);
      },
      error: (error) => {
        console.error('Error al obtener las ausencias:', error);
      }
    })
  }
}
