import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	input,
	OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { I_InputType } from './input.interface';
import { INPUT_FORM_IMPORTS } from './input.component.constant';
import { getErrorsMessage } from '@app/shared/utils/error-message';

let uniqueId = 0;

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [...INPUT_FORM_IMPORTS],
  	templateUrl: './input.component.html',
	styleUrl: './input.component.sass',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

	id = input<string>('');
	placeholder = input<string>('');
	label = input<string>('');
	type = input<I_InputType>('text');
	name = input<string>('');
	control = input<AbstractControl | undefined>(undefined);
	maxLength = input<number>(50);
	min = input<number | null | undefined>(null);
	max = input<number | null | undefined>(null);
	labelAlt = input<string>('');
	autocomplete = input<string>('on');
	addRequired = input<boolean>(false);
	disabled = input<boolean>(false);
	uppercase = input<boolean>(false);

	inputId = `app-input-${uniqueId++}`;
	labelError: null | string = null;
	errorMessages: Record<string, string> = {};
	controlForm = new FormControl();

	constructor(private _cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		if(this.control())
			this.controlForm = this.control() as FormControl;
		if (this.id() !== '' && this.id) this.inputId = this.id();

		if (this.control) {
			const label = this.label() !== '' ? this.label() : this.labelAlt();
			this.errorMessages = getErrorsMessage(label, this.control());
		}

		if (this.disabled()) this.control()?.disable();
		if (this.addRequired()) this.control()?.setValidators([Validators.required]);
	}

	cleanError() {
		this.labelError = null;
		this._cdr.detectChanges();
	}

	get firstErrorMessage(): string | null {
		if (!this.control()?.touched || !this.control()?.errors) return null;
		if(this.control()?.errors){
			const firstErrorKey = Object.keys(this.control()?.errors ?? {})[0];
			return this.errorMessages[firstErrorKey] ?? null;
		}
		return null;
	}
}
