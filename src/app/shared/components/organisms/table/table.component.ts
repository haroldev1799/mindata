import { AfterViewInit, Component, ContentChild, input, OnChanges, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { TABLE_IMPORTS } from './table.component.constant';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from './table.interface';
import { FilterService } from '@app/shared/services/filter.service';

@Component({
  selector: 'app-table',
  imports: [...TABLE_IMPORTS],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent<T> implements OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
	@ContentChild('actionsTemplate') customActionsTemplate!: TemplateRef<any>;

  filterService = inject(FilterService);

  dataSource = input<MatTableDataSource<T>>();
  columns = input<Column<any>[]>([]);
  messageEmpty = input('');
  filter = input(false);

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.displayedColumns = this.columns().map(c => c.header);
    if (changes['dataSource'] && this.dataSource() && this.paginator) {
      this.dataSource()!.paginator = this.paginator;
      this.dataSource()!.sort = this.sort;
      this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource()) {
      this.dataSource()!.paginator = this.paginator;
      this.dataSource()!.sort = this.sort;
      this.dataSource()!.filter = this.filterService.filterValue().trim().toLowerCase();
    }
  }
  
  applyFilter(event: Event) {
    this.filterService.filterValue.set((event.target as HTMLInputElement).value);
    this.dataSource()!.filter = this.filterService.filterValue().trim().toLowerCase();

    if (this.dataSource()!.paginator) {
      this.dataSource()!.paginator?.firstPage();
    }
  }
}
