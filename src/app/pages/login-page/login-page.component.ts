// login.component.ts
import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  public isLogged = false;

  constructor(
    public modalService: ModalService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.getLoggedInValue()) {
      this.isLogged = true;
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData.username, formData.password).subscribe(
        (response) => {
          const authToken = response.authToken;
          const refreshToken = response.refreshToken;
          const id = response.id;
          const username = response.userName;

          localStorage.setItem('authToken', authToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('userID', id);
          localStorage.setItem('userName', username);

          this.authService.setLoggedIn(true);

          this.router.navigate(['/home']);
        },
        (error) => {
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
