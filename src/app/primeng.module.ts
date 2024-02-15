import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

const modPrime : any = [
  ButtonModule,
  CardModule,
  InputTextModule,
  MenubarModule,
  PasswordModule,
  ToastModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrime
  ],
  exports : [
    modPrime
  ]
})
export class PrimengModule { }
