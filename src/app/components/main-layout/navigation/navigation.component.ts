import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/subject/data-user.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;


  clicked: boolean;
  dataEjecutivo: any;

  constructor(private _router: Router, private _dataService: DataUserService) {
    this.dataUser();
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }
  dataUser() {
    this._dataService.currentMessage.subscribe(value => {
      this.dataEjecutivo = value;
    })

  }
  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logout(): void {
    sessionStorage.setItem("identity-equifax", "");
    this._router.navigate(['/']);
  }
}
