import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-user',
  standalone: true,
  imports: [],
  templateUrl: './activate-user.component.html',
  styleUrl: './activate-user.component.scss',
})
export class ActivateUserComponent {
  constructor(private route: ActivatedRoute) {}
}
