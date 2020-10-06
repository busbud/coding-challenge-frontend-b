export class Destination {
    value: string;
    geohash: string;

    constructor(value: string, geohash: string) {
        this.value = value;
        this.geohash = geohash;
    }

    static getBosheagaDestinations(): Destination[]
    {
        return [new Destination("New-York", "dr5reg"), new Destination("Boston", "drt2yz")]
    }

    static getBosheagaArrivalDestinations(departureDestination: Destination): Destination[]
    {
        return this.getBosheagaDestinations().filter(destination => destination.geohash !== departureDestination.geohash);  
    }
}