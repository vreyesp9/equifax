import Swal from 'sweetalert2';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { MDBModalService } from 'angular-bootstrap-md';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { DataUserService } from 'src/app/services/subject/data-user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [TicketsService]
})
export class TicketComponent implements OnInit {
  @ViewChild('exampleModal') exampleModal: TemplateRef<any>;

  displayedColumns: string[] = ['nombre', 'rut', 'banco', 'tipocuenta', 'monto'];
  historial = [];
  dataSource = ELEMENT_DATA;
  dataTicket;
  modalRef;
  dataEjecutivo: any;
  constructor(private _tickets: TicketsService, private dialog: MatDialog, private _dataService: DataUserService) {
    this.getTickets()
    this.dataUser();
  }

  ngOnInit(): void {
  }

  dataUser() {
    this._dataService.currentMessage.subscribe(value => {
      this.dataEjecutivo = value;
    })

  }

  changeValue(value2) {


    this._tickets.updateTicket(value2).subscribe(
      response => {
        const prueba = response['data']
        value2.show = false;
        Swal.fire({
          icon: 'success',
          title: 'Ticket Actualizado',
          text: 'Ticket actualizado Correctamente ',
        });
      },
      error => {
        value2.show = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un problema, intente mas tarde',
        });
      }
    )


  }
  showAddTicketModal(): void {
    let dialogRef = this.dialog.open(AddTicketComponent, {
      height: 'fit-content',
      width: '100%',
      maxWidth: '900px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTickets();

    });
  }

  addTicket(data) {
    this._tickets.addTickets(data,this.dataEjecutivo).subscribe(
      response => {
        const addValue = response['data']
        this.getTickets();

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un problema, intente mas tarde',
        });
      }
    )

  }


  deleteTicket(data) {

    this._tickets.deleteTickets(data).subscribe(
      response => {
        const deleteValue = response['data']
        this.getTickets();
        Swal.fire({
          icon: 'success',
          title: 'Ticket Eliminado',
          text: 'Ticket Eliminado Correctamente ',
        });

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un problema, intente mas tarde',
        });
      }
    )

  }

  getTickets(): void {

    this._tickets.getTickets().subscribe(
      response => {
        this.dataTicket = response['data']


      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un problema, intente mas tarde',
        });
      }
    )
  }


}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
