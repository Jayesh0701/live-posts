import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn: boolean = false;
  public loginEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
}