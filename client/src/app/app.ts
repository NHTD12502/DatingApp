import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = 'Dating app';
  protected members = signal<any>([]);

  async  ngOnInit() {
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log("Complete the Http request")
    // })

    this.members.set(await this.getMembers());


    
  // constructor(private http: HttpClient) {}
}
  async getMembers() {
    try{
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'))

    } catch (error) {
      console.log(error);
      throw error;
    }


      
    }




}
