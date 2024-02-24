import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent implements OnInit {
  searchForm = new UntypedFormGroup({
    gameName: new UntypedFormControl('', Validators.required),
  });

  @Output() textSearched = new EventEmitter<string>();

  public searchingInput: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formData = this.searchForm.value;
    this.router.navigate([`/search/${formData.gameName}`]);
  }
}
