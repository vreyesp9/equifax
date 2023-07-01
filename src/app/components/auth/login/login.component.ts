import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutValidator } from 'ng9-rut';
import { DataUserService } from 'src/app/services/subject/data-user.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public identity;
  public token;
  userName: any;
  isLogin;
  registerForm: FormGroup;
  constructor(
    private socialAuthService: SocialAuthService,
    private fb: FormBuilder,
    private rutValidator: RutValidator,
    private _userService: UserService,
    private _router: Router,
    private _dataUser: DataUserService
  ) {
    this.isLogin = true;
    this.userForm = this.fb.group({
      rut: [
        '',
        [
          Validators.required,
          rutValidator,
          Validators.minLength(8),
          this.rutValidator,
        ],
      ],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      rut: [
        '',
        [
          Validators.required,
          rutValidator,
          Validators.minLength(8),
          this.rutValidator,
        ],
      ],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  createUsuario() {
    console.log('crear usuario ');

    try {
      console.log('valores del form para la cre', this.registerForm);

      this._userService
        .crearUsuario(this.registerForm.value)
        .subscribe((resp) => {
          console.log('valor de la respues', resp);
        });
    } catch (error) {
      console.log('error');
      Swal.fire({
        icon: 'error',
        title: 'Error al Registrar el Usuario',
        text: error.error.message,
      });
    }
  }
  onRegister() {
    this.isLogin = !this.isLogin;
    console.log('isLogin ', this.isLogin);
  }
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp) => {
        this.userName = resp.name;
        this._dataUser.sendData(resp.firstName);

        sessionStorage.setItem('identity-equifax', resp.authToken);
        this._router.navigate(['/home']);
        console.log('resp', resp);
      });
  }

  login() {
    this._userService
      .login(this.userForm.value.rut, this.userForm.value.password)
      .subscribe(
        (response) => {
          if (response['success']) {
            this.userName = response.data.user;
            this._dataUser.sendData(this.userName);

            sessionStorage.setItem('identity-equifax', response.data.token);
            this._router.navigate(['/home']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: response['msg'],
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: error.error.message,
          });
        }
      );
  }
}
