import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Output() textSearched = new EventEmitter<string>();
  @Output() refresh = new EventEmitter();

  public searchingInput : string = ""

  ngOnInit(): void {
  }

  onSearch(){
    this.textSearched.emit(this.searchingInput)
  }

  onRefresh(){
    this.refresh.emit()
  }

}
