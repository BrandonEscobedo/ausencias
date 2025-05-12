import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { CambioEstatus, SolicitudLista, SolicitudModelClass } from '../../../interface/solicitudes.interface';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-solicitud-actualizar',
  imports: [Select, ButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule, Toast],
  templateUrl: './solicitud-actualizar.component.html',
  styleUrl: './solicitud-actualizar.component.css',
  providers: [MessageService]

})
export class SolicitudActualizarComponent implements OnInit, OnDestroy {
  solicitud: SolicitudModelClass = new SolicitudModelClass();
  solicituService = inject(SolicitudesService);
  activatedRoute = inject(ActivatedRoute);

  messageService = inject(MessageService);
  CambioEstatus: CambioEstatus = {} as CambioEstatus;
  estatusValor: number = 0;
  comentarios: string = '';
  private unsuscribe = new Subject<void>();
  ActualizarEstatus() {
    this.CambioEstatus.folio = this.solicitud!.folio;
    this.CambioEstatus.numeroEmpleado = this.solicitud!.empleado.numeroEmpleado;
    this.CambioEstatus.comentarios = this.comentarios;
    this.CambioEstatus.estatus = parseInt(this.estatusValor.toString(), 10);
    console.log(this.CambioEstatus);
    this.solicituService.ActualizarEstatus(this.CambioEstatus).pipe(takeUntil(this.unsuscribe)).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Estatus actualizado', detail: 'El estatus de la solicitud ha sido actualizado correctamente.' });
        this.solicitud = new SolicitudModelClass();

      },
      error: (error) => {
        console.error('Error al crear la solicitud:', error);

        // Extraer el mensaje específico del servidor
        let errorDetail = 'Error al crear la solicitud';

        // Verificar las diferentes formas en que puede venir el mensaje de error
        if (error.error && typeof error.error === 'string') {
          // Si el error.error es directamente un string
          errorDetail = error.error;
        } else if (error.error && error.error.detail) {
          // Si tiene una propiedad detail
          errorDetail = error.error.detail;
        } else if (error.error && error.error.message) {
          // Si tiene una propiedad message
          errorDetail = error.error.message;
        } else if (error.message) {
          // Si el error tiene un mensaje directamente
          errorDetail = error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorDetail,
          life: 10000
        });
      }
    })
  }
  estatus = [
    { name: 'Aprobar', value: '1' },
    { name: 'Rechazar', value: '2' },
  ];
router= inject(Router);
  private formatDate(fecha: string | Date): string {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const anio = date.getFullYear().toString();// Tomar los últimos dos dígitos del año
    return `${dia}/${mes}/${anio}`;
  }
  ngOnInit(): void {

    const folio = this.activatedRoute.snapshot.paramMap.get('folio');
    if (folio) {
      this.solicituService.ObtenerSolicitudPorFolio(folio).pipe(takeUntil(this.unsuscribe)).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.estatus == "Pendiente") {
            this.solicitud = data;
            this.solicitud.fechaInicio = this.formatDate(this.solicitud.fechaInicio);
            this.solicitud.fechaFin = this.formatDate(this.solicitud.fechaFin);
          } else{
            this.router.navigate(['/no-disponbile']);
          }

        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la solicitud.' });
        }
      });
    }
    if (this.solicitud?.fechaInicio) {
      const raw: any = this.solicitud;
      raw.fechaInicio = new Date(raw.fechaInicio);
      raw.fechaFin = new Date(raw.fechaFin);
    }
  }
  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }
}
