
import { Component, OnInit, ɵConsole, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { OAuth } from 'src/app/_model/o-auth.model';
import { Login } from 'src/app/_model/login';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modelLogin = new Login(null, null);

  loginErrorMsg: String;
  showError: boolean;
  submitted = false;
  regSuccessMsg: String;
  showSuccess: boolean;
  subscription: Subscription;
  loginForm: FormGroup;

  constructor(private authService: AuthService,private renderer: Renderer2,
    private router: Router, private formBuilder: FormBuilder,private spinner: NgxSpinnerService) {
    this.getCustomMessage();

  }

  ngOnInit(): void { 
    this.setBodyClassForDesign();
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required]]
    });
    var isLogged = this.authService.isAuthenticated();
    if (isLogged) {
      this.router.navigate(["/booking"]);
      return;
    }
  }


  setBodyClassForDesign(): void{ 
    this.renderer.addClass(document.body,"hold-transition");
    this.renderer.addClass(document.body,"login-page");
  }

  getCustomMessage() {
    if (this.authService.showMessage) {
      this.regSuccessMsg = 'Registered Successfully !!!';
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 2500);
      this.authService.showMessage = false;
      return;
    }

    if (this.authService.showAuthError) {
      this.loginErrorMsg = 'Session time out !!!';
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2500);
      this.authService.showAuthError = false;
      return;
    }
  }


  get f() { return this.loginForm.controls; }


  reset() {
    this.loginForm.reset();
  }

  onSubmit(form: any) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.showError = false;
    this.showSuccess = false;
    this.spinner.show();
    this.authService.aunthenticate(this.UserName.value, this.Password.value)
      .subscribe(
        data => (    this.spinner.hide(),
        this.redirecToDashBoard(data)),
        err => {    this.spinner.hide();

          this.handleInvalidLogin(err);
        }
      )
  }

  redirecToDashBoard(oauth: OAuth) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(["/booking"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  handleInvalidLogin(err: HttpErrorResponse) {
    this.showError = true;
    this.loginErrorMsg = 'Bad Credentials !!! ';
    setTimeout(() => {
      this.showError = false;
    }, 2500);

    this.router.navigate(["/login"]);

  }

  get UserName() {
    return this.loginForm.get('Username');
  }

  get Password() {
    return this.loginForm.get('Password');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }



}
