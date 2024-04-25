import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  decodedToken: any | null;
  tokenKey = 'token' 
  roles: string[] = [];

  login(){
    this.authService.login(this.formLogin.value).subscribe(
      {
        next: (response) => {
          console.log(response);

          this.decodedToken = jwtDecode(localStorage.getItem(this.tokenKey)!)
          console.log('rollar kelishi kere');
          for (let index = 0; index < this.decodedToken.role.length; index++) {
            console.log(this.decodedToken.role[index]);
            if(this.decodedToken.role[index] == 'Admin'){
              console.log('admin-test');
              console.log(this.decodedToken.role[index]);
              this.router.navigate(['/users'])
            }
            else if(this.decodedToken.role[index] == 'Student'){
              console.log('student-test');
              console.log(this.decodedToken.role[index]);
              this.router.navigate(['/student-profile'])
            }
            
          }
          

          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'

          })

        },
        error: (err) => {
          
          console.log(err);

          this.matSnackBar.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          })
        }
        
      }
    )
  }

  register() {
    const rolesString: string = this.formRegister.value.roles;
    this.roles = rolesString.split(' ').map((role: string) => role.trim());
    this.formRegister.value.roles = this.roles;
    // Assuming you have a method in your AuthService for registering users
    this.authService.register(this.formRegister.value).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          this.matSnackBar.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          });
        }
      }
    );
  }
  
    ngOnInit(): void {
      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });

      this.formRegister = this.fb.group({
        fullname: ['', Validators.required],
        username: ['', Validators.required],
        age: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        roles: ['', Validators.required],
      })
    }
}
