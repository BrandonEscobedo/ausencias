import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Tag } from 'primeng/tag';
import { DrawerModule } from 'primeng/drawer';
import { ActualizarEstatusSolicitudComponent } from "../../actualizar-estatus-solicitud/actualizar-estatus-solicitud.component";
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import { Dialog } from 'primeng/dialog';
import { AusenciasEmpleadoComponent } from "../ausencias-empleado/ausencias-empleado.component";
import { SolicitudLista } from '../../../interface/solicitudes.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista-solicitudes',
  imports: [TableModule, CommonModule, ButtonModule, Tag, DrawerModule, ActualizarEstatusSolicitudComponent,
    ToastModule, TreeTableModule, Dialog, AusenciasEmpleadoComponent, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './lista-solicitudes.component.html',
  styleUrl: './lista-solicitudes.component.css',
  providers: [MessageService],
})
export class ListaSolicitudesComponent implements OnInit {
  solicitudes!: SolicitudLista[];
  visible: boolean = false;
event: any;
onEvent(event: any) {}
  clear(table: Table) {
    table.clear();
  }
  onVisible() {
    this.visible = true;
  }
  cerrarModal() {
    this.messageService.add({ severity: 'success', summary: 'Estatus actualizado', detail: 'El estatus de la solicitud ha sido actualizado correctamente.' });
    this.visible1 = false;
    this.getSolicitudes();

  }
  metaKey: boolean = true;
  solicitudSeleccionada: SolicitudLista = {} as SolicitudLista;
  visible1: boolean = false;

  selectedNode!: any;
  SolicitudesService = inject(SolicitudesService);
  first = 0;

  rows = 10;

  constructor(private messageService: MessageService) { }
  getSolicitudes() {
    this.SolicitudesService.getSolicitudes().subscribe((data: any) => {
      this.solicitudes = data.map((solicitud: any) => {
        if (solicitud.fechaInicio) {
          solicitud.fechaInicio = this.formatDate(solicitud.fechaInicio);
        }
        if (solicitud.fechaFin) {
          solicitud.fechaFin = this.formatDate(solicitud.fechaFin);
        }
        return solicitud;
      });
      this.solicitudes = data;
      console.log(this.solicitudes);
    });
  }
  ngOnInit(): void {
    this.getSolicitudes();
  }
  nodeSelect(event: any) {
    console.log(event.data);
    this.solicitudSeleccionada = event.data;

    this.visible1 = true;
  }
  private formatDate(fecha: string | Date): string {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const anio = date.getFullYear().toString();// Tomar los últimos dos dígitos del año
    return `${dia}/${mes}/${anio}`;
  }
  nodeUnselect(event: any) {
    this.visible1 = false;
  }
  solicitud(solicitud: any) {
    console.log(solicitud);
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.solicitudes ? this.first + this.rows >= this.solicitudes.length : true;
  }

  isFirstPage(): boolean {
    return this.solicitudes ? this.first === 0 : true;
  }
}
