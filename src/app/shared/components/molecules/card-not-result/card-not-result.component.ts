import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-not-result',
	imports: [CommonModule],
  templateUrl: './card-not-result.component.html',
  styleUrl: './card-not-result.component.sass',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNotResultComponent {

	message = input<string>('No hay elementos.');
  	classesNotResult = input<string>('default');
}
