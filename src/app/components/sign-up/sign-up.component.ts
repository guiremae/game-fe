// login.component.ts
import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignupComponent {
  signUpForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    public modalService: ModalService
  ) {}

  onSubmit() {
    /*     this.authService.login(this.username, this.password).subscribe(
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
    ); */
  }
}
