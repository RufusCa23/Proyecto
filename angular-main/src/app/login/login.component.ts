import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    if (this.service.IsLogged()) {
      this.router.navigate(['/']);
    }
  }

  userData: any = {};
  token: string = '';

  loginform = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  login() {
    if (this.loginform.valid) {
      this.service.Login(this.loginform.value).subscribe((res: any) => {
        if (res) {
          this.userData = res.user;
          this.token = res.token;
          sessionStorage.setItem('token', this.token);
          sessionStorage.setItem('user', JSON.stringify(this.userData));
          this.toastr.success('Se ha iniciado sesión correctamente');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Revise los datos ingresados');
        }
      });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
