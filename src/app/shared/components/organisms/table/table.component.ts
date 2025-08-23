import { AfterViewInit, Component, ContentChild, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TABLE_IMPORTS } from './table.component.constant';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from './table.interface';

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
  
  @Input() dataSource!: MatTableDataSource<T>;
  @Input() columns: Column<any>[] = [];
  @Input() messageEmpty: string = '';

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    this.displayedColumns = this.columns.map(c => c.header);
    if (changes['dataSource'] && this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    
  }
}
