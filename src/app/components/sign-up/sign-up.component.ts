// login.component.ts
import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { tap, catchError, throwError } from 'rxjs';
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
    name: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    public modalService: ModalService
  ) {}

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, username, name, password } = this.signUpForm.value;

      this.authService
        .signUp(email, username, name, password)
        .pipe(
          tap((response) => {
            console.log(response);
            this.modalService.closeModal();
          }),
          catchError((error) => {
            console.log('Error durante el registro:', error);
            return [];
          })
        )
        .subscribe();
    }
  }
}
