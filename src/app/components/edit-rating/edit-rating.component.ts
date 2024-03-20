import { Component, Inject, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingService } from 'src/app/services/rating.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrl: './edit-rating.component.scss',
})
export class EditRatingComponent {
  ratingForm = new UntypedFormGroup({
    rating: new UntypedFormControl('', Validators.required),
  });
  game: any;
  constructor(
    public modalService: ModalService,
    public ratingService: RatingService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.game = this.data.game;
    this.game.rating
      ? this.ratingForm.get('rating')?.setValue(this.game.rating)
      : this.ratingForm.get('rating')?.setValue(5);
  }

  onSubmit() {
    const gameID = this.game.id;
    const rating = this.ratingForm.get('rating')?.value;
    this.ratingService.setRating(gameID, rating).subscribe(
      (response) => {
        this._snackBar.open('Puntuacíon editada con éxito', undefined, {
          duration: 1500,
          panelClass: ['app-notification-success', 'center'],
        });
        this.modalService.closeModal(rating);
      },
      (error) => {}
    );
  }

  getColor(): any {
    const value = this.ratingForm.controls['rating'].value;
    if (value >= 0 && value < 5) {
      return 'warn';
    } else if (value >= 5 && value < 7.5) {
      return 'accent';
    } else if (value >= 7.5 && value <= 10) {
      return 'primary';
    }
  }
}
