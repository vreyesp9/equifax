import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket.routing.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng9RutModule } from 'ng9-rut';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { TicketComponent } from './ticket.component';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTicketComponent } from './add-ticket/add-ticket.component';




@NgModule({
  imports: [
    MainLayoutModule,
    CommonModule,
    TicketRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    Ng9RutModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MDBBootstrapModule.forRoot(),
    ModalModule,
    AutocompleteLibModule
  ],
  declarations: [TicketComponent, AddTicketComponent],
})
export class TicketModule { }
