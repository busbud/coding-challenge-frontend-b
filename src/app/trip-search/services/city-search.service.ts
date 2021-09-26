import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  // Ideally this should be retrieved from Backend.
  private cityList: {name: string, geohash: string}[] = [
    { name: "Québec", geohash: "f2m673"},
    { name: "Montréal", geohash: "f25dvk"},
    { name: "New York", geohash: "dr5reg"},
    { name: "New Hampshire", geohash: "fake"},
    { name: "New Victoria", geohash: "fake"},
    { name: "New Caceres", geohash: "fake"},
    { name: "Toronto", geohash: "fake"},
    { name: "Vancouver", geohash: "fake"},
    { name: "Calgary", geohash: "fake"},
    { name: "Edmonton", geohash: "fake"},
    { name: "Ottawa", geohash: "fake"},
    { name: "Winnipeg", geohash: "fake"},
    { name: "Hamilton", geohash: "fake"},
    { name: "Kitchener", geohash: "fake"},
    { name: "London", geohash: "fake"},
    { name: "Victoria", geohash: "fake"},
    { name: "Halifax", geohash: "fake"},
    { name: "Oshawa", geohash: "fake"},
    { name: "Windsor", geohash: "fake"},
    { name: "Saskatoon", geohash: "fake"},
    { name: "St. Catharines", geohash: "fake"},
    { name: "Regina", geohash: "fake"},
  ];

  constructor() { }

  search(query: string): Observable<{name: string, geohash: string}[]> {
    return of(this.cityList.filter(city => this.normalize(city.name).includes(this.normalize(query))))
  }

  private normalize(str: string) {
    return str.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
