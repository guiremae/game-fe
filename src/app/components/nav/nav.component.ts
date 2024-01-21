import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlatformEvent } from 'src/app/models/interfaces/platformEvent.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() platformSelected = new EventEmitter<PlatformEvent>();
  
  constructor() { }
  

  ngOnInit(): void {
  }
  
  onPlatformSelected(platform: PlatformEvent){
    
    this.platformSelected.emit(platform);
  }



}
