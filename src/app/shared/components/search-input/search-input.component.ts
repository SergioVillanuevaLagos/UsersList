import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {



  searchTerm: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    this.search.emit(this.searchTerm.trim());
  }

  onKeyUp() {
    this.search.emit(this.searchTerm.trim());
  }
  constructor() { }

  ngOnInit(): void {
      }

}
