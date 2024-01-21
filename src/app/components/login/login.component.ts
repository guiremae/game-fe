// login.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    public modalService: ModalService,
  ) {}

  onSubmit() {
    const formData = this.loginForm.value;
    this.authService.login(formData.username, formData.password).subscribe(
      (response) => {
        // Manejar la respuesta del backend, que debería incluir el token de sesión
        const token = response.token;

        // Guardar el token de sesión en localStorage o en una cookie
        localStorage.setItem('token', token);

        // Establecer el estado de autenticación en el servicio
        this.authService.setLoggedIn(true);

        // Cerrar la modal después de un inicio de sesión exitoso
        this.modalService.closeModal();
      },
      (error) => {
        // Manejar errores de autenticación
        console.error('Error durante el inicio de sesión:', error);
      }
    );
  }
}
