import { Story } from '@storybook/react/types-6-0';
import AxiosMock from '@/.storybook/AxiosMock';
import MockAdapter from 'axios-mock-adapter';

import BudDepartures, { BudDeparturesProps } from './BudDepartures';

export default {
  title: 'Components/BudDepartures',
  component: BudDepartures,
};

const mockData = {
  departures: [
    {
      amenities: {
        ac: true,
        average_seat: true,
        bus_attendant: false,
        carpool: false,
        display_name: 'Flex',
        food: false,
        full_recline_seat: false,
        hot_meal: false,
        leg_room: true,
        power_outlets: true,
        refreshment: false,
        small_seat: false,
        toilet: true,
        tv: false,
        wifi: false,
        xl_seat: false,
      },
      arrival_time: '2020-10-30T12:45:00',
      arrival_timezone: 'America/Montreal',
      available_seats: 22,
      busbud_departure_id: '83eee623',
      cache_source: 'departure-service',
      class: 'FLEX',
      class_name: 'Flex',
      complete: false,
      data_source: 'l2',
      departure_time: '2020-10-30T09:30:00',
      departure_timezone: 'America/Montreal',
      departure_type: 'editable-refundable',
      destination_location_id: 1938,
      duration: 195,
      fetched_at: '2020-10-23T02:42:22.509Z',
      has_search_details: false,
      has_transfers: false,
      id: 'NTUwNzg1MTQ6ODNlZWU2MjM',
      num_transfers: 0,
      operator_id: 'a7ad22de-ad5b-4408-abce-ded634595698',
      origin_location_id: 12189,
      prices: { currency: 'USD', total: 5360 },
      search_request_id:
        '202010230301eddd20d68823b70546136fcb37d6a92e59a2f4b00735eb4e2492f4e619a5a27d',
      sellable: true,
      passenger_questions: [],
      trip_stops: [],
    },
  ],
  operators: [
    {
      display_name: 'Orléans Express',
      id: 'a7ad22de-ad5b-4408-abce-ded634595698',
      logo_url:
        'https://busbud.imgix.net/operator-logos/logo_orleans-express.png.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF',
      name: 'Orléans Express',
      url: 'https://www.orleansexpress.com/',
    },
  ],
};

const mock = (apiMock: MockAdapter): void => {
  apiMock.onGet('/api/meetings/1').reply(200, mockData);
};

const Template: Story<BudDeparturesProps> = args =>
  (
    <AxiosMock mock={mock}>
      <BudDepartures {...args} />
    </AxiosMock>
  );

export const Default = Template.bind({});

Default.args = {
  loading: false,
  departures: [
    {
      amenities: {
        ac: true,
        average_seat: true,
        bus_attendant: false,
        carpool: false,
        display_name: 'Flex',
        food: false,
        full_recline_seat: false,
        hot_meal: false,
        leg_room: true,
        power_outlets: true,
        refreshment: false,
        small_seat: false,
        toilet: true,
        tv: false,
        wifi: false,
        xl_seat: false,
      },
      arrival_time: '2020-10-30T12:45:00',
      arrival_timezone: 'America/Montreal',
      available_seats: 22,
      busbud_departure_id: '83eee623',
      cache_source: 'departure-service',
      class: 'FLEX',
      class_name: 'Flex',
      complete: false,
      data_source: 'l2',
      departure_time: '2020-10-30T09:30:00',
      departure_timezone: 'America/Montreal',
      departure_type: 'editable-refundable',
      destination_location_id: 1938,
      duration: 195,
      fetched_at: '2020-10-23T02:42:22.509Z',
      has_search_details: false,
      has_transfers: false,
      id: 'NTUwNzg1MTQ6ODNlZWU2MjM',
      num_transfers: 0,
      operator_id: 'a7ad22de-ad5b-4408-abce-ded634595698',
      origin_location_id: 12189,
      prices: { currency: 'USD', total: 5360 },
      search_request_id:
        '202010230301eddd20d68823b70546136fcb37d6a92e59a2f4b00735eb4e2492f4e619a5a27d',
      sellable: true,
      passenger_questions: [],
      trip_stops: [],
    },
  ],
  operators: [
    {
      display_name: 'Orléans Express',
      id: 'a7ad22de-ad5b-4408-abce-ded634595698',
      logo_url:
        'https://busbud.imgix.net/operator-logos/logo_orleans-express.png.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF',
      name: 'Orléans Express',
      url: 'https://www.orleansexpress.com/',
    },
  ],
};
