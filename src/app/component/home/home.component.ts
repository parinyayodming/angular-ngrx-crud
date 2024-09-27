import { Component, OnInit } from '@angular/core';
import { getusers } from 'src/app/Store/User/User.action';
import { UserService } from 'src/app/service/user.service';
import { Store } from '@ngrx/store';
import { Userinfo, Users } from 'src/app/Store/Model/User.model';
import { getuserlist } from 'src/app/Store/User/User.Selectors';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private store: Store) {}
  userAll?: Users[];

  userlist: Userinfo = {
    id: 0,
    username: '',
    email: '',
    name: '',
    role: '',
    status: false,
  };

  ngOnInit(): void {
    this.getUserData();
    // this.getAllUser();
  }

  getUserData() {
    let jsonstring = localStorage.getItem('userdata') as string;
    this.userlist = JSON.parse(jsonstring);
    console.log(this.userlist);
  }

  getAllUser() {
    this.store.dispatch(getusers());
    this.store.select(getuserlist).subscribe((item) => {
      this.userAll = item;
      console.log(this.userAll);
    });
  }
}
