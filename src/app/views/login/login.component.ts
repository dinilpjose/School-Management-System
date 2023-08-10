import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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

  users: User[] = [
    { username: 'user1', password: 'password' },
    { username: 'user2', password: 'password' },
    { username: 'user3', password: 'password' }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    console.debug('LoginComponent/ngOnInit');

    sessionStorage.clear()
    localStorage.clear()


    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
    // Validators.pattern("^\\s{0,}?[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}\\s{0,}?$")

  }
  onSubmit() {
    const matchedUser = this.users.find((user) => user.username === this.form.value.username && user.password === this.form.value.password);
    if (matchedUser) {
      this.disableLogin = false;
      this.errorText = 'Login successful!';

    } else {
      // User not found, show an error message
      this.disableLogin = true;
      this.errorText = 'Invalid Credentials';

    }
  }

  onChange(){
    this.disableLogin = false;
  }

  errorText = '';
  showPassword = false;
  disableLogin = false;
  showQuestionnaire = false;
  form: FormGroup = new FormGroup({});

}
