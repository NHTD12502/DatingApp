import { Component,signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from '../account/register/register';
import { User } from '../../types/users';
import { Input } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [Register, FormsModule, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // @Input ({required: true}) membersFromApp: User[] = [];
  protected registerMode = signal(false);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

}
