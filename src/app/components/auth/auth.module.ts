import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth.routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng9RutModule } from 'ng9-rut';



@NgModule({
    declarations: [LoginComponent],
    imports: [

        ReactiveFormsModule,
        AuthRoutingModule,
        MDBBootstrapModule.forRoot(),

        Ng9RutModule


    ]
})
export class AuthModule { }
