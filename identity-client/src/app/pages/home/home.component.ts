import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private readonly translocoService: TranslocoService){
    this.translocoService.translate('title')
    this.translocoService.translate('form.firstName')
  }

  public languagesList: 
    Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/images/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'EN',
    },
    {
      imgUrl: '/assets/images/Russian.png',
      code: 'ru',
      name: 'Russian',
      shorthand: 'RU',
    },
    {
      imgUrl: '/assets/images/Uzbekistan.png',
      code: 'uz',
      name: 'Uzbekistan',
      shorthand: 'UZ',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fl'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }



  router = inject(Router);
  tokenKey = 'token' 
  tokenDecoded : any;

  ngOnInit(): void {
    this.tokenDecoded = jwtDecode(localStorage.getItem(this.tokenKey)!)
      console.log('decoded token');
      console.log(this.tokenDecoded);
      console.log('data kelyabdi');
      console.log(Date.UTC(+5));

      if(this.tokenDecoded.exp * 1000 < Date.now()){
        this.router.navigate(['/login'])
      }
  }
}
