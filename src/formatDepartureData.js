import { pick, curry, map, pipe, prop } from 'ramda';
import { findById, findAndGetProps, renameKeys, transformValues, sortByTimes } from './shapeData';

const findAndGetAddress = findAndGetProps(['name', 'address']);
const findAndGetName = curry((arrayToSearch, id) => {
  return prop('displayName', findById(id, arrayToSearch));
});

const desiredKeys = ['prices', 'departureTime', 'arrivalTime', 'originLocationId', 'destinationLocationId', 'operatorId'];

const nameTransformations = {
  prices: 'price',
  originLocationId: 'origin',
  destinationLocationId: 'destination',
  operatorId: 'operator',
};

const valueTransformations = (locations, operators) => {
  return {
    price: prop('total'),
    origin: findAndGetAddress(locations),
    destination: findAndGetAddress(locations),
    operator: findAndGetName(operators),
  };
};

const formatDepartureData = (tripInformation) => {
  const { locations, departures, operators } = tripInformation;
  const valueTransformer = valueTransformations(locations, operators);
  return sortByTimes(map(pipe(
    pick(desiredKeys),
    renameKeys(nameTransformations),
    transformValues(valueTransformer),
  ), departures));
};

export default formatDepartureData;
