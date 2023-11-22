import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  registerform = this.builder.group({
    firstName: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    lastName: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });

  proceedRegister() {
    if (this.registerform.valid) {
      this.service.Register(this.registerform.value).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Se ha registrado correctamente');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('No se ha podido registrar');
        }
      });
    } else {
      this.toastr.error('Por favor, revise los campos');
    }
  }
}
