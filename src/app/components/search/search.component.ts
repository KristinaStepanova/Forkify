import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SearchService } from "src/app/services/search.service";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})

export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  saveSearch = false;
  searchHistory = [];
  filteredOptions: Array<Object> = [];

  @Output() getData: EventEmitter<Object> = new EventEmitter();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getSearchHistory().subscribe((res) => {
      this.searchHistory = res;
    });
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    ).subscribe(result => this.filteredOptions = result);
  }

  onSearch() {
    const isNotUniqueEl = this.searchHistory.find(el => el.name === this.searchControl.value);

    if (this.saveSearch && !isNotUniqueEl) {
      this.searchService
        .saveSearchHistory(this.searchControl.value)
        .then((res) => {
         console.log()
        });
    }
    this.searchService
      .searchRecipe(this.searchControl.value)
      .subscribe((res) => {
        console.log(res)
        this.getData.emit(res);
      });
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.searchHistory.filter((item) =>
      item.name.toLowerCase().includes(filterValue)
    );
  }
}
