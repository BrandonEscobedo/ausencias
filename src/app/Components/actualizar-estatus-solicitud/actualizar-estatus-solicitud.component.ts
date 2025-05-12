import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { CambioEstatus, SolicitudLista } from '../../interface/solicitudes.interface';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-actualizar-estatus-solicitud',
  imports: [Select, ButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule, Toast],
  templateUrl: './actualizar-estatus-solicitud.component.html',
  styleUrl: './actualizar-estatus-solicitud.component.css',
  providers: [MessageService]
})
export class ActualizarEstatusSolicitudComponent implements OnInit, OnDestroy {

  visible = output<boolean>();
  cerrarModal = output<boolean>();
  solicitud = input<SolicitudLista>();
  solicituService = inject(SolicitudesService);
  messageService = inject(MessageService);
  CambioEstatus: CambioEstatus = {} as CambioEstatus;
  estatusValor: number = 0;
  comentarios: string = '';
  private unsuscribe = new Subject<void>();
  ActualizarEstatus() {
    this.CambioEstatus.folio = this.solicitud()!.folio;
    this.CambioEstatus.numeroEmpleado = this.solicitud()!.empleado.numeroEmpleado;
    this.CambioEstatus.comentarios = this.comentarios;
    this.CambioEstatus.estatus = parseInt(this.estatusValor.toString(), 10); // Aseguramos que sea un entero ;
    console.log(this.CambioEstatus);
    this.solicituService.ActualizarEstatus(this.CambioEstatus).pipe(takeUntil(this.unsuscribe)).subscribe({
      next: (data) => {
        this.cerrarModal.emit(false);
      },
      error: (error) => {
        this.messageService.add({ severity: 'success', summary: 'Estatus actualizado', detail: 'El estatus de la solicitud ha sido actualizado correctamente.' });
      }
    })
  }

  estatus = [
    { name: 'Liberar', value: '3' },
    { name: 'Rechazar', value: '4' },
  ];
  showDialog() {
    this.visible.emit(true);
  }
  ngOnInit(): void {
    if (this.solicitud()?.fechaInicio) {
      const raw: any = this.solicitud();
      raw.fechaInicio = new Date(raw.fechaInicio);
      raw.fechaFin = new Date(raw.fechaFin);
    }
  }
  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }
}
