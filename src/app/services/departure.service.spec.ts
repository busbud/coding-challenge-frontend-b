import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DepartureService } from './departure.service';


describe('DepartureService', () => {
  let service: DepartureService;

  let httpTestingController: HttpTestingController;

  const tripSearch = {
    origin: 'f2m673',
    destination: 'f25dvk',
    outboundDate: '2000-01-01',
    adult: 1,
    child: 0,
    senior: 0,
    currency: 'USD',
    lang: 'en'
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DepartureService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });

  it('sets headers for request', () => {
    service.getDepartures(tripSearch).subscribe();

    const req = httpTestingController.expectOne(getUrl());

    expect(req.request.headers.get('Accept'))
      .toBe('application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/');
    expect(req.request.headers.get('X-Busbud-Token'))
      .toBe('PARTNER_c9g6z7V0SNqUlnar2EFsxw');
  });

  it('retrieves and parses data', () => {
    let travelInfo = {};

    service.getDepartures(tripSearch).subscribe(data => travelInfo = data);

    expect(travelInfo).toEqual({
      origin: tripSearch.origin,
      destination: tripSearch.destination,
      locations: [],
      operators: [],
      departures: [],
      complete: false,
      error: false
    });

    httpTestingController.expectOne(getUrl()).flush({
      cities: [{ name: 'Québec' }, { name: 'Montréal' }],
      departures: [getDepartureData('id1')],
      locations: [{ id: 1234, name: 'Location 1' }, { id: 4321, name: 'Location 2' }],
      operators: [{ id: 'op1', name: 'Alsa', logo_url: 'path/to/logo' }],
      complete: true
    });
    
    expect(travelInfo).toEqual({
      origin: 'Québec',
      destination: 'Montréal',
      locations: [{ id: 1234, name: 'Location 1' }, { id: 4321, name: 'Location 2' }],
      operators: [{ id: 'op1', name: 'Alsa', logoUrl: 'path/to/logo' }],
      departures: [getDeparture('id1')],
      complete: true
    });

  });

  it('handles errors', () => {
    let travelInfo = {};

    service.getDepartures(tripSearch).subscribe(data => travelInfo = data);

    httpTestingController.expectOne(getUrl()).error(new ErrorEvent('Network error'));

    expect(travelInfo).toEqual({
      origin: tripSearch.origin,
      destination: tripSearch.destination,
      locations: [],
      operators: [],
      departures: [],
      complete: true,
      error: true
    });

  });

  function getDepartureData(id: string) {
    return {
      arrival_time: '2021-09-30T14:15:00',
      departure_time: '2021-09-30T15:15:00',
      origin_location_id: 1234,
      destination_location_id: 4321,
      duration: 60, 
      operator_id: 'op1',
      id,
      prices: { total: 5432, currency: 'USD' }
    }
  }

  function getDeparture(id: string) {
    return {
      arrivalTime: '2021-09-30T14:15:00', 
      departureTime: '2021-09-30T15:15:00', 
      originId: 1234,
      destinationId: 4321, 
      duration: 60, 
      operatorId: 'op1',
      id,
      price: 5432,
      currency: 'USD'
    }
  }

  function getUrl(): string {
    const baseUrl = 'https://napi.busbud.com/x-departures/f2m673/f25dvk/2000-01-01';
    const params = 'adult=1&senior=0&child=0&lang=en&currency=USD';
    return `${baseUrl}?${params}`;
  }
});
