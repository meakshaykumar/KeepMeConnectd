import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { GroupDescComponent } from '../shared/groupDescPopOver/groupdesc.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value = '';
  currentUser: any;
  userName: any;
  groups:any;
  groupA: any;
  groupB: any;
  constructor(private userService:UserService, private _modalService:MatDialog) { }


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.userService.getUserName(this.currentUser.email).subscribe(res=> this.userName = res);

    this.userService.getAllGroups().subscribe(
      (res)=>{
        this.groups = res;
        this.groupA = this.groups.slice(0,4)
        this.groupB = this.groups.slice(4,8)
      }
    )
  }

  openDetails(data){
    this._modalService.open(GroupDescComponent, {
      width: '1200px',
      height: '550px',
      data: data
    });
  }

}
