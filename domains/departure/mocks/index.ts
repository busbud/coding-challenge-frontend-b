import { build, fake } from '@jackfranklin/test-data-bot';

import { DepartureItem } from 'domains/departure';
import { Operator } from '../models';

export const departureItemBuilder = build<DepartureItem>({
  fields: {
    id: fake((faker) => faker.random.uuid()),
    departureTime: fake((faker) => faker.date.future().toDateString()),
    arrivalTime: fake((faker) => faker.date.future().toDateString()),
    price: fake((faker) => faker.random.number(1000)),
    originLocation: {
      name: fake((faker) => faker.random.word()),
      city: {
        name: fake((faker) => faker.address.city()),
      },
    },
    destinationLocation: {
      name: fake((faker) => faker.random.word()),
      city: {
        name: fake((faker) => faker.address.city()),
      },
    },
    operator: fake((faker) => new Operator(
      faker.random.word(),
      faker.image.imageUrl(),
    )),
  },
});
