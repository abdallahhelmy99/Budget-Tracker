import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  @Input() balance: number = 0; // Initialize balance to 0

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  updateBalance(userInput: number) {}
}
