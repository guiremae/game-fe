import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/sign-up/sign-up.component';
import { AddToListComponent } from '../components/add-to-list/add-to-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PictureModalComponent } from '../components/picture-modal/picture-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public dialogRef!: MatDialogRef<
    | LoginComponent
    | SignupComponent
    | AddToListComponent
    | PictureModalComponent
  >;
  constructor(public dialog: MatDialog) {}

  openLoginModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'dialog-container',
    });
  }

  openAddToListModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(AddToListComponent, {
      width: '400px',
      panelClass: 'dialog-container',
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
      panelClass: 'dialog-container',
    });
  }

  openPicture(imageUrl: string) {
    this.dialogRef = this.dialog.open(PictureModalComponent, {
      data: { imageUrl },
      width: '70vw',
      panelClass: 'dialog-container',
    });
  }
}
