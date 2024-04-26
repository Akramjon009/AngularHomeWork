import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  router = inject(Router);
  tokenKey = 'token' 
  tokenDecoded : any;

  ngOnInit(): void {
    this.tokenDecoded = jwtDecode(localStorage.getItem(this.tokenKey)!)
      console.log('decoded token');
      console.log(this.tokenDecoded);
      console.log('data kelyabdi');
      console.log(Date.now());

      if(this.tokenDecoded.exp * 1000 < Date.now()){
        this.router.navigate(['/login'])
      }
  }
}
