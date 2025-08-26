import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { ButtonData, ButtonType, ButtonTypeComponent } from './button.interface';
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'app-button',
	imports: [MatButtonModule],
	templateUrl: './button.component.html',
	styleUrl: './button.component.sass',
})
export class ButtonComponent {
	private static uniqueId = 0;

	data = input<ButtonData | null>(null);
	label = input<string | undefined>();
	severity = input<string>(ButtonType.PRIMARY);
	type = input<string>(ButtonTypeComponent.BUTTON);
	disabled = input<boolean>(false);
	isFullWidth = input<boolean>(false);
	clicked = output<MouseEvent>();

	readonly buttonId = `app-button-${ButtonComponent.uniqueId++}`;

	readonly BUTTON_TYPE = ButtonType;

	onClicked($event: MouseEvent) {
		if (!this.disabled()) this.clicked.emit($event);
	}
}
