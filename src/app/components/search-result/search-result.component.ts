import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnChanges {
  @Input('result') searchResult;

  constructor() { }

  ngOnChanges(): void {
    console.log(this.searchResult)
  }

}
