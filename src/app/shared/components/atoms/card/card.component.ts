import { CommonModule } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent {
	@ContentChild('customHeader') customHeader!: TemplateRef<any>;
	@ContentChild('customContent') customContent!: TemplateRef<any>;
	@ContentChild('customActions') customActions!: TemplateRef<any>;

  title = input<string>();
  subTitle = input<string>();
  customActionsClass = input<string>('');

}
