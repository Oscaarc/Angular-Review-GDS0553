import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]
  });

  constructor (private fb : FormBuilder, private au : AuthService, private ms : MessageService, private router : Router) { };

  get email() {
    return this.loginForm.controls['email']
  }

  get password() {
    return this.loginForm.controls['password']
  }

  login() {
    console.log("si")
    const {email, password } = this.loginForm.value

    this.au.getUserbyEmail(email as string).subscribe(
      response => {
        console.log(response)
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem("email", email as string)
          console.log("funciona")
          this.router.navigate(['/home'])
        } else {
          this.ms.add({severity : 'error', summary : 'Error', detail : 'Email o contraseña incorrecta'})
        }
      },
      error => {
        this.ms.add({severity : 'error', summary : 'Error', detail : 'Email o contraseña incorrecta'})        
      }
    )
  }
}
