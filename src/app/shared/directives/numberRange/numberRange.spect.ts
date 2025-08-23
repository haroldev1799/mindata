import { FormControl, NgControl } from '@angular/forms';
import { NumberRangeDirective } from './numberRange';

describe('NumberRangeDirective', () => {
  let directive: NumberRangeDirective;
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl();
    const ngControl = { control } as Partial<NgControl> as NgControl;
    directive = new NumberRangeDirective(ngControl);
    directive.min = 1;
    directive.max = 99;
  });

  it('debería crear la directiva', () => {
    expect(directive).toBeTruthy();
  });

  it('debería corregir valor menor que min', () => {
    const input = { value: '0' } as HTMLInputElement;
    directive.onInput({ target: input } as any);

    expect(control.value).toBe(1);
    expect(input.value).toBe('1');
  });

  it('debería corregir valor mayor que max', () => {
    const input = { value: '150' } as HTMLInputElement;
    directive.onInput({ target: input } as any);

    expect(control.value).toBe(99);
    expect(input.value).toBe('99');
  });

  it('debería aceptar valor dentro del rango', () => {
    const input = { value: '50' } as HTMLInputElement;
    directive.onInput({ target: input } as any);

    expect(control.value).toBe(50);
    expect(input.value).toBe('50');
  });

  it('debería resetear si no es número', () => {
    const input = { value: 'abc' } as HTMLInputElement;
    directive.onInput({ target: input } as any);

    expect(control.value).toBeNull();
    expect(input.value).toBe('abc'); // input sigue mostrando lo que escribió el user
  });
});
