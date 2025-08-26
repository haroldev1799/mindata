import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from './table.component';
import { Column } from './table.interface';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { signal } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent<any>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set messageEmpty from input', () => {
    const value = '';

    component.ngOnChanges({
      messageEmpty: {
        currentValue: value,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.messageEmpty()).toBe(value);
  });

  it('should set displayedColumns to empty when no columns provided', () => {
    component.ngOnChanges({
      columns: {
        currentValue: [],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.displayedColumns).toEqual([]);
  });

  it('should assign paginator and sort when dataSource and paginator exist', () => {
    const mockDataSource: any = {};
    (component as any).dataSource = () => mockDataSource;
    (component as any).paginator = { firstPage: jasmine.createSpy('firstPage') };
    (component as any).sort = {};

    component.ngOnChanges({ dataSource: { currentValue: mockDataSource, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(mockDataSource.paginator).toBe(component.paginator);
    expect(mockDataSource.sort).toBe(component.sort);
    expect(component.paginator.firstPage).toHaveBeenCalled();
  });

  it('should apply filter and reset paginator', () => {
    const mockPaginator = { firstPage: jasmine.createSpy('firstPage') };
    const mockDataSource: any = { filter: '', paginator: mockPaginator };

    component['filterService'] = {
      filterValue: signal('')
    } as any;

    (component as any).dataSource = () => mockDataSource;

    const event = { target: { value: '   Batman   ' } } as any as Event;

    component.applyFilter(event);

    expect(component['filterService'].filterValue()).toBe('   Batman   ');
    expect(mockDataSource.filter).toBe('batman');
    expect(mockPaginator.firstPage).toHaveBeenCalled();
  });
});
