import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  userName: Object;
  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserName(this.currentUser.email).subscribe(res=> this.userName = res);
  }
 
  logout(){
    this.userService.logOut();
    this.router.navigate([""]);
  }

}
