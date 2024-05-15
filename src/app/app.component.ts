import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'E-Banking-Frontend';
  constructor(private authService: AuthService, private router: Router ) {
  }
  ngOnInit(): void {
    this.authService.loadTokenFromLocalStorage();

  }
}
