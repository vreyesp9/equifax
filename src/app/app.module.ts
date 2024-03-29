import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainLayoutModule } from './components/main-layout/main-layout.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng9RutModule } from 'ng9-rut';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatCommonModule } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, PrincipalComponent],
  imports: [
    HttpClientModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MainLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    Ng9RutModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    SocialLoginModule,
    MatCommonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '148517665605-jspahbqleats6lvlag9kasc2c11b5g7o.apps.googleusercontent.com'
            ),
          },
        ],
      },
    },
    // AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
