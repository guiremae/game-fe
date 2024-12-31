import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm = new UntypedFormGroup({
    userID: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    public modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { userID, email } = this.resetPasswordForm.value;

      this.authService
        .sendRequestPassword(userID, email)
        .pipe(
          tap(() => {
            this._snackBar.open(
              'Se ha enviado un correo para recuperar la contraseña',
              undefined,
              {
                duration: 1500,
                panelClass: ['center'],
              }
            );
            this.modalService.closeModal();
          }),
          catchError((error) => {
            return [];
          })
        )
        .subscribe();
    }
  }
}
