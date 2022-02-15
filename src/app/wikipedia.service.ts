import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    let wikiUrl = new URL('https://en.wikipedia.org/w/api.php');

    let parameters = new HttpParams()
      .set('search', term)
      .set('action', 'opensearch')
      .set('generator', 'search')
      .set('format', 'json')
      .set('callback', 'JSONP_CALLBACK');
  
    wikiUrl.search = parameters.toString();

    return this.http
      .jsonp(wikiUrl.toString(), null)
      .pipe(map((response) => response));
  }
}
