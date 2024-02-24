import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PlatformEvent } from 'src/app/models/interfaces/platformEvent.interface';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Output() platformSelected = new EventEmitter<PlatformEvent>();

  constructor() {}

  ngOnInit(): void {}

  onPlatformSelected(platform: PlatformEvent) {
    this.platformSelected.emit(platform);
  }
}
