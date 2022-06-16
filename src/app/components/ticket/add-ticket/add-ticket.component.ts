import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataUserService } from 'src/app/services/subject/data-user.service';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
  providers: [TicketsService]
})
export class AddTicketComponent implements OnInit {
  formAdd = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    status: new FormControl(''),

  });
  dataEjecutivo: any;
  constructor(
    private dialog: MatDialog, private _tickets: TicketsService, private _dataService: DataUserService
  ) {
    this.dataUser();
  }

  ngOnInit(): void {

  }

  dataUser() {
    this._dataService.currentMessage.subscribe(value => {
      this.dataEjecutivo = value;
    })

  }

  createTicket() {
    const params = this.formAdd.value
    this._tickets.addTickets(params, this.dataEjecutivo).subscribe(
      response => {
        const dataTicket = response['data']
        Swal.fire({
          icon: 'success',
          title: 'Ticket Creado',
          text: 'Ticket Creado Correctamente ',
        });

        this.dialog.closeAll()

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

}
