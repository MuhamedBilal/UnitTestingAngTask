import { Component } from '@angular/core';
import { MyServiceService } from './my-service.service';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];

  constructor(private myServiceService: MyServiceService) {}

  ngOnInit() {
    this.myServiceService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
}