import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departure } from './departure.model';
import { Subject, timer } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';
import { httpOptions } from './HttpHeaders';

@Injectable({
  providedIn: 'root'
})
export class DeparturesService {
  private departuresUpdated = new Subject<Departure[]>();
  private isLoadingUpdated = new Subject<boolean>();
  isLoading = false;
  departures: Departure[];

  constructor(private http: HttpClient) {}

  fetchResults(origin: string, destination: string, dateAndTime: string) {
    this.isLoadingUpdated.next(true);
    this.http.get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${dateAndTime}`, httpOptions)
      .subscribe(initialResponse => {
        this.departures = [];
        const isComplete = initialResponse['complete'];

        // TODO: Increment index by response['departures'].length
        const index = 0;

        if (isComplete === false) {
          timer(0, 4000)
            // tslint:disable-next-line: max-line-length
            .pipe(concatMap(() => this.http.get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${dateAndTime}/poll?index=${index}`, httpOptions)))
            .pipe(filter(backendData => backendData['complete'] === true))
            .pipe(take(1))
            .subscribe(pollResponse => {
              this.updateDepartures(pollResponse);
          });
        } else {
          this.updateDepartures(initialResponse);
        }
      });
  }

  updateDepartures(response: any) {
    const fetchedlocations = response['locations'];
    const fetchedDepartures = response['departures'];
    console.log(fetchedlocations);
    fetchedDepartures.forEach(xDept => {
        let modifiedPrice = xDept['prices']['total'];
        modifiedPrice = ((modifiedPrice * 1.0) / 100).toFixed(2);
        let modifiedArrivalTime = xDept['arrival_time'];
        modifiedArrivalTime = modifiedArrivalTime.substring(11, 16);
        let modifiedDepartureTime = xDept['departure_time'];
        modifiedDepartureTime = modifiedDepartureTime.substring(11, 16);
        let modifiedOriginLocation = fetchedlocations.find(elem => elem['id'] === xDept['origin_location_id']);
        modifiedOriginLocation = modifiedOriginLocation['name'];

        const depart = {
          departureTime: modifiedDepartureTime,
          arrivalTime: modifiedArrivalTime,
          locationName: modifiedOriginLocation,
          price: modifiedPrice
        };
        this.departures.push(depart);
      });
      console.log(this.departures);
      this.departuresUpdated.next([...this.departures]);
      this.isLoadingUpdated.next(false);
  }

  getDepartureUpdateListener() {
    return this.departuresUpdated.asObservable();
  }

  getIsLoadingUpdateListener() {
    return this.isLoadingUpdated.asObservable();
  }

}
