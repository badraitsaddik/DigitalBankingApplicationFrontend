import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  constructor(private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }

}
