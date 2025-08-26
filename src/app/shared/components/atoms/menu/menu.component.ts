import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { MENU_IMPORTS } from './menu.component.constant';
import { MenuData } from './menu.interface';

@Component({
  selector: 'app-menu',
  imports: [...MENU_IMPORTS],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {

  options = input<MenuData[]>([]);
  clickOption = output<number | undefined>();

  selectOption(option: number | undefined) {
    this.clickOption.emit(option);
  }
}
