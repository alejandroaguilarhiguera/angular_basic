import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLoginGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formLoginGroup = this.formBuilder.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    const { txtUsername, txtPassword } = this.formLoginGroup.value;
    this.authService.login(txtUsername, txtPassword).subscribe((credentials) => {
      if (credentials.jwt) {
        this.router.navigate(['products']);
      }
    });
  }

}
