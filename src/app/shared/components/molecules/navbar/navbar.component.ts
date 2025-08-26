import { Component, output } from '@angular/core';
import { LAYOUT_IMPORTS } from './navbar.component.constants';

@Component({
  selector: 'app-navbar',
  imports: [...LAYOUT_IMPORTS],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {

  sidebarAction = output<void>(); 

}
