import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  searchForm = new UntypedFormGroup({
    gameName: new UntypedFormControl('', Validators.required),
  });

  @Output() textSearched = new EventEmitter<string>();

  public searchingInput : string = ""

  constructor(private gamesService : GamesService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    const formData = this.searchForm.value;
    this.gamesService.SearchGame(formData.gameName);
  }

}
