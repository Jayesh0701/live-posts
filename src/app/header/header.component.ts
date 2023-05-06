import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
constructor(private backEndService:BackEndService,public authService:AuthenticationService,private router: Router,){
  this.authService.loginEvent.subscribe((isLoggedIn: boolean) => {
    this.authService.isLoggedIn = isLoggedIn;
  });
}

onSave(){
  this.backEndService.saveData();
}
onFetch(){
  this.backEndService.fetchData();
}
onLogOut(){
  this.authService.isLoggedIn = false;
  this.authService.loginEvent.emit(false);
  this.router.navigate(['/auth']);
}
ngOnInit(): void {
  this.onFetch();
}
}
