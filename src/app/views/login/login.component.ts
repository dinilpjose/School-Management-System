import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


interface User {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.debug('LoginComponent/ngOnInit');

    this.loginService.isLogedIn.next(false);
    sessionStorage.clear()
    localStorage.clear()
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }
  onSubmit() {
    console.debug('LoginComponent/onSubmit()');

    if (this.form.valid) {
      this.loginService.login(this.form.value)
      this.loginService.isLogedIn.subscribe(data => { console.log(data); this.loggedIn = data })
      if (this.loggedIn) {
        this.disableLogin = false;
        this.loginService.isLogedIn.next(true);
        this.errorText = 'Login successful!';
        this.router.navigate(['/home']);
      }
      else {
        this.disableLogin = true;
        this.errorText = 'Invalid Credentials';
      }
    }

  }

  onChange() {
    console.debug('LoginComponent/onChange()');

    this.disableLogin = false;
  }

  errorText = '';
  showPassword = false;
  disableLogin = false;
  showQuestionnaire = false;
  loggedIn: boolean = false;
  form: FormGroup = new FormGroup({});

}
