import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from './table.component';
import { Column } from './table.interface';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  it('should set displayedColumns from columns input', () => {
    const columns: Column<any>[] = [
      { header: 'name', field: 'name' },
      { header: 'age', field: 'age' }
    ];

    component.columns = columns;
    component.ngOnChanges({
      columns: {
        currentValue: columns,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.displayedColumns).toEqual(['name', 'age']);
  });

  // it('should attach paginator and sort on ngOnChanges if dataSource present', () => {
  //   // 👇 mock de MatPaginator con las props que Angular espera
  //   const mockPaginator = jasmine.createSpyObj<MatPaginator>('MatPaginator', ['firstPage'], {
  //     page: of(), length: 0, pageIndex: 0, pageSize: 5,
  //     hasNextPage: () => false, hasPreviousPage: () => false
  //   });

  //   // 👇 mock de MatSort con sortChange como observable
  //   const mockSort = jasmine.createSpyObj<MatSort>('MatSort', [], {
  //     active: 'name', direction: 'asc', sortChange: of()
  //   });

  //   const dataSource = new MatTableDataSource<any>([{ name: 'Thor', age: 1500 }]);

  //   component.paginator = mockPaginator;
  //   component.sort = mockSort;
  //   component.dataSource = dataSource;

  //   component.ngOnChanges({
  //     dataSource: {
  //       currentValue: dataSource,
  //       previousValue: null,
  //       firstChange: true,
  //       isFirstChange: () => true
  //     }
  //   });

  //   expect(component.dataSource.paginator).toBe(mockPaginator);
  //   expect(component.dataSource.sort).toBe(mockSort);
  //   expect(mockPaginator.firstPage).toHaveBeenCalled();
  // });

  // it('should attach paginator and sort on ngAfterViewInit', () => {
  //   const mockPaginator = jasmine.createSpyObj<MatPaginator>('MatPaginator', ['firstPage'], {
  //     page: of(), length: 0, pageIndex: 0, pageSize: 5,
  //     hasNextPage: () => false, hasPreviousPage: () => false
  //   });

  //   const mockSort = jasmine.createSpyObj<MatSort>('MatSort', [], {
  //     active: 'age', direction: 'desc', sortChange: of()
  //   });

  //   const dataSource = new MatTableDataSource<any>([{ name: 'Spiderman', age: 25 }]);

  //   component.paginator = mockPaginator;
  //   component.sort = mockSort;
  //   component.dataSource = dataSource;

  //   component.ngAfterViewInit();

  //   expect(component.dataSource.paginator).toBe(mockPaginator);
  //   expect(component.dataSource.sort).toBe(mockSort);
  // });

  it('should accept messageEmpty input', () => {
    component.messageEmpty = 'No records found';
    expect(component.messageEmpty).toBe('No records found');
  });

  it('should set displayedColumns to empty when no columns provided', () => {
    component.columns = [];
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
});
