import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatError, MatInputModule } from "@angular/material/input";
import { NumberRangeDirective } from "@app/shared/directives/numberRange";
import { TrimInputDirective } from '@shared/directives/trimInput.directive';

export const INPUT_FORM_IMPORTS = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatError,
    TrimInputDirective,
    NumberRangeDirective
];

