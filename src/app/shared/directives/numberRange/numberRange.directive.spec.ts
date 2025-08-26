import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { NumberRangeDirective } from './numberRange.directive';

@Component({
  template: `<input [formControl]="control" appNumberRange [min]="1" [max]="99" />`,
  standalone: true,
  imports: [ReactiveFormsModule, NumberRangeDirective]
})
class HostComponent {
  control = new FormControl();
}

describe('NumberRangeDirective (con HostComponent)', () => {
  it('debería corregir valor menor que min', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '0';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBe(1);
    expect(input.value).toBe('1');
  });

  it('debería corregir valor mayor que max', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '150';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBe(99);
    expect(input.value).toBe('99');
  });

  it('debería aceptar valor dentro del rango', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '50';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBe(50);
    expect(input.value).toBe('50');
  });

  it('debería resetear si no es número', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBeNull();
    expect(input.value).toBe('');
  });

  it('debería aceptar exactamente el min', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBe(1);
    expect(input.value).toBe('1');
  });

  it('debería aceptar exactamente el max', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '99';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const host = fixture.componentInstance;
    expect(host.control.value).toBe(99);
    expect(input.value).toBe('99');
  });
});
