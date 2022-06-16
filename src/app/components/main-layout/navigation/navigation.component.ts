import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;


  clicked: boolean;

  constructor(private _router: Router) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logout(): void {
    sessionStorage.setItem("identity-equifax", "");
    this._router.navigate(['/']);
  }
}
