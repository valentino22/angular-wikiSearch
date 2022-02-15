import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  share,
  filter,
} from 'rxjs';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private wikipediaService: WikipediaService) {}

  items: Observable<any>;
  searchStream = new Subject<string>();

  search(term: string) {
    this.searchStream.next(term);
  }

  zip(a: Array<string>, b: Array<string>) {
    return a.map((item, index) => {
      return [item, b[index]];
    });
  }

  ngOnInit() {
    this.items = this.searchStream.pipe(
      debounceTime(500),
      distinctUntilChanged(), // only initiate search if term has changed
      filter(term => term.length != 0), // only initiate search if term is not null
      switchMap((term) => this.wikipediaService.search(term)),
      map((result) => this.zip(result[1], result[3])), // create one single array from results
      share(), // make request only once even if there are multiple subscriber
    );
  }
}
