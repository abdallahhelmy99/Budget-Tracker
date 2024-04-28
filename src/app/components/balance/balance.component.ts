import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  @Input() balance: number = 0; // Initialize balance to 0

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  updateBalance(userInput: number) {}
}
