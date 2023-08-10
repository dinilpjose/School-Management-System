import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: Array<object> = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
  ];
  public isLogedIn = new BehaviorSubject<boolean>(false);

  constructor() { }


  login(formData: any) {
    console.debug('LoginService/login()');
    this.users.find((credentials: any) => {
      if (formData?.username === credentials?.username && formData?.password === credentials?.password) {
        this.isLogedIn.next(true);
      }
    });
  }

}
