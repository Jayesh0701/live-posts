import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackEndService } from '../back-end.service';
import { SignUp } from '../sign-up.model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  selectedTab: string = 'login';
  form!: FormGroup;
  loginForm!: FormGroup;

  constructor(
    private backendService: BackEndService,
    private notifyService: NotificationService,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.form.reset();
    this.loginForm.reset();
  }
  async onSubmitSignUp() {
    try {
      let FullUserName = this.form.value.FullUserName;
      let EmailAddress = this.form.value.EmailAddress;
      let UserName = this.form.value.UserName;
      let PassWord = this.form.value.PassWord;
      let isDuplicate;

      const userDetail: SignUp = new SignUp(
        FullUserName,
        EmailAddress,
        UserName,
        PassWord,
        new Date()
      );
      isDuplicate = await this.backendService.addUserInDB(userDetail);
      if (!isDuplicate) {
        this.notifyService.showSuccess('Sign-Up Successful', 'Now you can Log-In');
        this.form.reset();
      }
      else{
        this.notifyService.showError('Record with same Username and Email ID is already present', '');
      }
    } catch (ex) {
      console.log(ex);
      this.notifyService.showError('Error Occured', 'Please Try Again Later');
    }
  }
  onSubmitLogin() {
    let usrName = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let isValid: any = false;
    isValid = this.backendService.loginWithUser(usrName, password);
    if (isValid) {
      this.authService.isLoggedIn = true;
      this.authService.loginEvent.emit(true);
      this.notifyService.showSuccess('Login Successful', '');
      this.router.navigate(['/post-list']);
    } else {
      this.authService.isLoggedIn = false;
      this.notifyService.showError('Invalid Login', '');
    }
  }

  validateLogin() {
    let username = '';
    let password = '';
    this.loginForm = new FormGroup({
      username: new FormControl(username, [Validators.required]),
      password: new FormControl(password, [Validators.required]),
    });
  }
  validateSignup() {
    let FullUserName = '';
    let EmailAddress = '';
    let UserName = '';
    let PassWord = '';
    this.form = new FormGroup({
      FullUserName: new FormControl(FullUserName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      EmailAddress: new FormControl(EmailAddress, [
        Validators.required,
        Validators.email,
      ]),
      UserName: new FormControl(UserName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      PassWord: new FormControl(PassWord, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  ngOnInit(): void {
    this.validateSignup();
    this.validateLogin();
  }
}
