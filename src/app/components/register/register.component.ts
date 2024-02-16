import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { error } from 'node:console';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match.directives';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullname : ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]],
    confirmPassword : ['', [Validators.required]]
  },
  {
    validators : passwordMatchValidator
  });

  constructor (private fb : FormBuilder, private authService : AuthService, private messageService : MessageService, private router : Router) { }

  get email() {
    return this.registerForm.controls['email']
  }

  get fullname() {
    return this.registerForm.controls['fullname']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }

  enviarUsuario() {
    console.log("Envianding")

    const datos = {...this.registerForm.value}
    if (datos.confirmPassword == datos.password) {
      delete datos.confirmPassword;

      this.authService.registerUser(datos as User).subscribe(
        response => {
          this.messageService.add({
            severity : 'success',
            summary : 'Registro Exitoso',
            detail : 'El usuario ha sido registrado con éxito',
          })
          this.router.navigate(['/login'])
        },
        error => {
          this.messageService.add({
            severity : 'error',
            summary : 'Registro fallido',
            detail : 'Fallo el registro de usuario'
          })
        }
      )
    } else {
      this.messageService.add({
        severity : 'error',
        summary : 'Registro fallido',
        detail : 'Las contraseñas no coinciden'
      })
    }
  }
}
