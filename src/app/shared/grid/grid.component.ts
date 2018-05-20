import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { Column } from '../models/columns';
import { WaitingIndicatorService } from '../waiting-indicator/waiting-indicator.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() columns: Column[];
  @Input() entities;
  @Input() gridTitle: string;
  @Input() emptySearch: string;
  @Input() emptyList: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchableColumns: string[];
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  isSearchActive = false;
  searchField = new FormControl();
  courses: string[];
  groups: string[];
  courseControl = new FormControl();
  groupControl = new FormControl();
  allEntities;
  defaultPageSize = 10;

  constructor(
    public waitingIndicator: WaitingIndicatorService,
  ) {}

  ngOnInit() {
    this.displayedColumns = _.map(this.columns, 'id');
    this.searchableColumns = _(this.columns).filter('searchable').map('id').value();

    this.initFilters();
    this.initSearch();

    this.entities.subscribe(entities => {
      this.allEntities = entities;
      this.dataSource.data = entities;
      this.courses = this.getOptionList('course');
      this.groups = this.getOptionList('group');

      _.debounce(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilter.bind(this);
      })();
    });
  }

  private getOptionList(fieldName: string): string[] {
    return _(this.dataSource.data).map(fieldName).uniq().sort().value();
  }

  private initSearch() {
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (filterValue) {
          this.courseControl.setValue([]);
          this.courseControl.disable();
        } else {
          this.courseControl.enable();
        }
      });
  }

  private initFilters() {
    let filterByCourseData = [];

    this.courseControl.valueChanges.subscribe((courses: string[]) => {
      this.groupControl.setValue([]);

      if (_.size(courses)) {
        this.groupControl.enable();
        this.dataSource.data = _(this.allEntities)
          .filter(entity => courses.some(course => entity.course === course))
          .value();
        this.groups = this.getOptionList('group');
        filterByCourseData = this.dataSource.data;
      } else {
        this.groupControl.disable();
        this.dataSource.data = this.allEntities;
      }
    });

    this.groupControl.disable();
    this.groupControl.valueChanges.subscribe((groups: string[]) => {
      this.dataSource.data = _.size(groups)
        ? _(filterByCourseData)
          .filter(entity => groups.some(group => entity.group === group))
          .value()
        : filterByCourseData;
    });
  }

  customFilter(data, filter: string): boolean {
    return this.searchableColumns.some(column => data[column].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  hideSearch() {
    if (!this.searchField.value) {
      this.isSearchActive = false;
    }
  }

  clearSearch() {
    this.searchField.setValue('');
  }
}
