import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/sign-up/sign-up.component';
import { AddToListComponent } from '../components/add-to-list/add-to-list.component';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public dialogRef!: MatDialogRef<LoginComponent | SignupComponent | AddToListComponent>;

  constructor(public dialog: MatDialog) {}


  openLoginModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'dialog-container' 
    });
  }

  openAddToListModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(AddToListComponent, {
      width: '400px',
      panelClass: 'dialog-container' 
    });
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openSignUpModal(): void {
        if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(SignupComponent, {
      width: '400px',
      panelClass: 'dialog-container' 
    });
  }
}