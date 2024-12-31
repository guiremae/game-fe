import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/sign-up/sign-up.component';
import { AddToListComponent } from '../components/add-to-list/add-to-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PictureModalComponent } from '../components/picture-modal/picture-modal.component';
import { ShareComponent } from '../components/share/share.component';
import { EditRatingComponent } from '../components/edit-rating/edit-rating.component';
import { Observable } from 'rxjs';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public dialogRef!: MatDialogRef<
    | LoginComponent
    | SignupComponent
    | AddToListComponent
    | PictureModalComponent
    | ShareComponent
    | EditRatingComponent
    | ResetPasswordComponent
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

  openAddToListModal(listData: any[], game: any): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(AddToListComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      data: { listData: listData, game: game },
    });
  }

  closeModal(data?: any): void {
    if (this.dialogRef) {
      this.dialogRef.close(data);
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

  openResetPasswordModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(ResetPasswordComponent, {
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

  openShareLink(url: string) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(ShareComponent, {
      data: { url },
      width: '400px',
      panelClass: 'dialog-container',
    });
  }

  openEditRatingModal(game: any): Observable<number> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(EditRatingComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      data: { game: game },
    });
    return this.dialogRef.afterClosed();
  }
}
