import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('InputComponent - firstErrorMessage', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    control = new FormControl('');
    (component as any).control = () => control;
  });

    it('should assign controlForm if control is provided', () => {
    const control = new FormControl('');
    (component as any).control = () => control;

    component.ngOnInit();

    expect(component.controlForm).toBe(control);
  });

  it('should not assign controlForm if control is undefined', () => {
    (component as any).control = () => undefined;

    component.ngOnInit();

    expect(component.controlForm).toBeInstanceOf(FormControl);
  });

  it('should set inputId when id is provided', () => {
    (component as any).id = () => 'custom-id';

    component.ngOnInit();

    expect(component.inputId).toBe('custom-id');
  });

  it('should keep default inputId when id is empty', () => {
    const originalId = component.inputId;
    (component as any).id = () => '';

    component.ngOnInit();

    expect(component.inputId).toBe(originalId);
  });

  it('should build errorMessages when control is defined', () => {
    const control = new FormControl('');
    (component as any).control = () => control;
    (component as any).label = () => 'Nombre';

    component.ngOnInit();

    expect(Object.keys(component.errorMessages).length).toBeGreaterThan(0);
  });

  it('should disable control when disabled() is true', () => {
    const control = new FormControl('');
    (component as any).control = () => control;
    (component as any).disabled = () => true;

    component.ngOnInit();

    expect(control.disabled).toBeTrue();
  });

  it('should add required validator when addRequired() is true', () => {
    const control = new FormControl('');
    (component as any).control = () => control;
    (component as any).addRequired = () => true;

    component.ngOnInit();

    control.setValue('');
    expect(control.invalid).toBeTrue();
  });

  it('should return null if control not touched', () => {
    control.markAsUntouched();
    control.setErrors({ required: true });
    expect(component.firstErrorMessage).toBeNull();
  });

  it('should return null if control touched but has no errors', () => {
    control.setValue('Batman');
    control.markAsTouched();
    control.setErrors(null);
    expect(component.firstErrorMessage).toBeNull();
  });

  it('should return mapped error message when errors exist', () => {
    control.markAsTouched();
    control.setErrors({ required: true });
    component.errorMessages = { required: 'Campo obligatorio' };

    expect(component.firstErrorMessage).toBe('Campo obligatorio');
  });

  it('should return null if error key not found in errorMessages', () => {
    control.markAsTouched();
    control.setErrors({ required: true });

    component.errorMessages = {};

    expect(component.firstErrorMessage).toBeNull();
  });

  it('should reset labelError and call detectChanges', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    const cdrSpy = spyOn(component['_cdr'], 'detectChanges');

    component.labelError = 'some error';
    component.cleanError();

    expect(component.labelError).toBeNull();
    expect(cdrSpy).toHaveBeenCalled();
  });
});
