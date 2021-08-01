import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  currentUser: any;
  userEvents: any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUserEvents(this.currentUser.email).subscribe((res)=>{
      this.userEvents = res;
      console.log(this.userEvents);
    })
  }

}
