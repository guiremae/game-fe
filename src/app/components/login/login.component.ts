// login.component.ts
import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    public modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData.username, formData.password).subscribe(
        (response) => {
          // Manejar la respuesta del backend, que debería incluir el token de sesión
          const authToken = response.authToken;
          const refreshToken = response.refreshToken;
          const id = response.id;
          const username = response.userName;

          // Guardar el token de sesión en localStorage o en una cookie
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userID', id);
          localStorage.setItem('userName', username);

          // Establecer el estado de autenticación en el servicio
          this.authService.setLoggedIn(true);

          this._snackBar.open('Sesión iniciada con éxito', undefined, {
            duration: 1500,
            panelClass: 'center',
          });
          // Cerrar la modal después de un inicio de sesión exitoso
          this.modalService.closeModal();
        },
        (error) => {
          // Manejar errores de autenticación
          if (error.status === 403) {
            return this._snackBar.open('Credenciales no válidas', undefined, {
              duration: 1500,
              panelClass: ['app-notification-error', 'center'],
            });
          }
          return this._snackBar.open(
            'Ha fallado la conexión con el servidor',
            undefined,
            {
              duration: 1500,
              panelClass: ['app-notification-error', 'center'],
            }
          );
        }
      );
    }
  }
}
