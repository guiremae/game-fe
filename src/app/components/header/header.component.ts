import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public modalService: ModalService
  ) {}

  @Output() textSearched = new EventEmitter<string>();
  @Output() refresh = new EventEmitter();

  ngOnInit(): void {}
}
