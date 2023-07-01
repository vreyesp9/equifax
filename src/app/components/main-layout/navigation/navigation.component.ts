import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataUserService } from 'src/app/services/subject/data-user.service';

import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  clicked: boolean;
  dataEjecutivo: any;

  constructor(
    private _router: Router,
    private _dataService: DataUserService,
    private socialAuthService: SocialAuthService
  ) {
    this.dataUser();
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {}
  dataUser() {
    this._dataService.currentMessage.subscribe((value) => {
      this.dataEjecutivo = value;
    });
  }
  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logoutGoogle() {
    this.socialAuthService.signOut().then((resp) => {
      console.log('resp desloge0o ', resp);
    });
  }

  logout(): void {

     this.socialAuthService.signOut().then((resp) => {
       console.log('resp desloge0o ', resp);
     });

    sessionStorage.setItem('identity-equifax', '');
    this._router.navigate(['/']);
  }
}
