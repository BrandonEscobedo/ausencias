import { Component, inject, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Toast } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, StepperModule, ButtonModule,
    FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule, InputText, CommonModule, Toast], templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  numeroEmpleado: string = '';
  correo: string = '';
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);
  login() {
    if (this.numeroEmpleado && this.correo) {
      this.authService.login(this.numeroEmpleado, this.correo).subscribe({
        next: (response: any) => {
          const token = response;
          this.authService.saveToken(token);

          const redirectUrl = this.authService.getRedirectUrl();
          this.authService.clearRedirectUrl();
          const role = this.authService.getRole();
          if (role === 'Empleado') {
            this.router.navigateByUrl('/crearSolicitud');
          } else if (role === 'Gerente') {
            this.router.navigateByUrl('');
          } else if (role === 'RH') {
            this.router.navigateByUrl('/solicitudes');
          }

        },
        error: (error) => {
          console.error(error);
          // Aquí puedes manejar el error
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas' });
        }
      });
    }
  }
}
