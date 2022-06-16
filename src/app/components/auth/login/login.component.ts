import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutValidator } from 'ng9-rut';
import { DataUserService } from 'src/app/services/subject/data-user.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public identity;
  public token;
  userName: any;

  constructor(private fb: FormBuilder,
    private rutValidator: RutValidator,
    private _userService: UserService,
    private _router: Router,
    private _dataUser: DataUserService



  ) {
    this.userForm = this.fb.group({
      rut: ['', [Validators.required, rutValidator, Validators.minLength(8), this.rutValidator]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  login() {
    this._userService.login(this.userForm.value.rut, this.userForm.value.password).subscribe(
      response => {
        if (response["success"]) {
     
          this.userName = response.data.user
          this._dataUser.sendData(this.userName);

          sessionStorage.setItem("identity-equifax", response.data.token);
          this._router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: response["msg"],
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: error.error.message,
        });
      }
    )

  }
}
