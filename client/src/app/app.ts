import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Home], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'Dating app';
  protected members = signal<User[]>([]);

  async  ngOnInit() {
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log("Complete the Http request")
    // })

    this.members.set(await this.getMembers());
    this.setCurrentUser();


    
  // constructor(private http: HttpClient) {}
}

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(): Promise<User[]> {
    try{
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'))

    } catch (error) {
      console.log(error);
      throw error;
    }


      
    }




}
