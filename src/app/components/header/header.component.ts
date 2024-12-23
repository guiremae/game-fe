import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/services/layout.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public modalService: ModalService,
    public layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe('(max-width: 1279.98px)')
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  public isSmallScreen = false;
  @Output() textSearched = new EventEmitter<string>();
  @Output() refresh = new EventEmitter();

  ngOnInit(): void {}
}
