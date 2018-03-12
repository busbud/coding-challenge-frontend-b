import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage, FormattedDate, FormattedTime, FormattedNumber } from 'react-intl';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DirectionsBusIcon from 'material-ui-icons/DirectionsBus';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { getHours, getMinutes, formattedAddress } from '../../../utils/helpers';
import messages from '../messages';
import Trip from '../component';

const props = {
  classes: {
    departure: 'Component-departure-274',
    duration: 'Component-duration-275',
    arrival: 'Component-arrival-276',
    actions: 'Component-actions-277',
    expand: 'Component-expand-278',
    expandOpen: 'Component-expandOpen-279',
  },
  arrival_timezone: 'America/Montreal',
  available_seats: 50,
  bus: null,
  busbud_departure_id: 'c1c8c842',
  class: 'Economy',
  class_name: '-',
  fare_name: null,
  deeplink: null,
  departure_timezone: 'America/New_York',
  destination_location_id: 1938,
  duration: 499,
  links: {
    deeplink:
      'https://www.busbud.com/en/deeplink/dr5reg/f25dvk/N2Y5ODU1MTpjMWM4Yzg0Mg?outbound_date=2018-08-07&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}',
  },
  operator_id: 'bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0',
  origin_location_id: 1942,
  source_id: 155,
  ticket_types: ['print', 'claim'],
  departure_time: '2018-08-07T00:01:00',
  arrival_time: '2018-08-07T08:20:00',
  fetched_at: '2018-03-11T17:55:24.569Z',
  prices: {
    currency: 'USD',
    total: 7200,
    categories: {
      adult: 7200,
      child: 7200,
      senior: 7200,
    },
    discount: 0,
    roundtrip_min: null,
    roundtrip_total: null,
    discounted: null,
    breakdown: {
      base: 7200,
      fees: 0,
      taxes: 0,
      discount: 0,
    },
  },
  trip_stops: null,
  addons: null,
  details: {},
  operator: {
    id: 'bfc27cd5-44ca-49c1-8d00-0f2bc00c58c0',
    source_id: 155,
    profile_id: 580,
    name: 'Greyhound',
    url: null,
    logo_url: 'https://busbud.imgix.net/operator-logos/greyhound.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF',
    display_name: 'Greyhound',
  },
  destination_location: {
    id: 1938,
    city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
    name: "Gare d'autocars de Montréal",
    address: ['1717 Rue Berri', 'Montréal, QC H2L 4E9', 'Canada'],
    type: 'bus_station',
    lat: 45.516235,
    lon: -73.562668,
    geohash: 'f25dyjcr3',
  },
  origin_location: {
    id: 1942,
    city_id: '375dd587-9001-acbd-84a4-683deda84183',
    name: 'Port Authority Bus Terminal',
    address: ['619-623 8th Ave', 'New York, NY 10018', 'USA'],
    type: 'bus_station',
    lat: 40.756252,
    lon: -73.990684,
    geohash: 'dr5ru73wk',
  },
  isExpanded: false,
  toggleExpansion: jest.fn(),
};

describe('component | Jumbotron | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<Trip {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });
    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<Trip {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('CardContent', () => {
    describe('Departure', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Trip {...props} />);

        const { className } = wrapper
          .find(CardContent)
          .at(0)
          .find(Grid)
          .at(1)
          .props();

        expect(className).toBe(props.classes.departure);
      });
      describe('FormattedDate', () => {
        it('should contains proper value', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);

          const { value } = wrapper
            .find(CardContent)
            .at(0)
            .find(Grid)
            .at(1)
            .find(FormattedDate)
            .props();

          // then
          const expectedValue = new Date(props.departure_time);
          expect(value).toEqual(expectedValue);
        });
      });
      describe('FormattedTime', () => {
        it('should contains proper value', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);

          const { value } = wrapper
            .find(CardContent)
            .at(0)
            .find(Grid)
            .at(1)
            .find(FormattedTime)
            .props();

          // then
          const expectedValue = new Date(props.departure_time);
          expect(value).toEqual(expectedValue);
        });
      });
    });
    describe('Duration', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Trip {...props} />);

        const { className } = wrapper
          .find(CardContent)
          .at(0)
          .find(Grid)
          .at(2)
          .props();

        expect(className).toBe(props.classes.duration);
      });
      describe('Typography', () => {
        it('should have proper className props', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);

          const { className } = wrapper
            .find(CardContent)
            .at(0)
            .find(Grid)
            .at(2)
            .find(Typography)
            .props();

          // then
          expect(className).toBe(props.classes.duration);
        });
        it('should contains proper hours message', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);
          const hours = 8;

          const formattedMessageProps = wrapper
            .find(CardContent)
            .find(Typography)
            .find(FormattedMessage)
            .find('.duration__hours')
            .props();

          // then
          expect(formattedMessageProps).toMatchObject({
            values: { amount: hours },
            ...messages.hours,
          });
        });
        it('should contains proper minutes message', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);
          const minutes = 19;

          const formattedMessageProps = wrapper
            .find(CardContent)
            .find(Typography)
            .find(FormattedMessage)
            .find('.duration__minutes')
            .props();

          // then
          expect(formattedMessageProps).toMatchObject({
            values: { amount: minutes },
            ...messages.minutes,
          });
        });
      });
    });
    describe('Arrival', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Trip {...props} />);

        const { className } = wrapper
          .find(CardContent)
          .at(0)
          .find(Grid)
          .at(3)
          .props();

        expect(className).toBe(props.classes.arrival);
      });
      describe('FormattedDate', () => {
        it('should contains proper value', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);

          const { value } = wrapper
            .find(CardContent)
            .at(0)
            .find(Grid)
            .at(3)
            .find(FormattedDate)
            .props();

          // then
          const expectedValue = new Date(props.arrival_time);
          expect(value).toEqual(expectedValue);
        });
      });
      describe('FormattedTime', () => {
        it('should contains proper value', () => {
          // given
          const wrapper = shallow(<Trip {...props} />);

          const { value } = wrapper
            .find(CardContent)
            .at(0)
            .find(Grid)
            .at(3)
            .find(FormattedTime)
            .props();

          // then
          const expectedValue = new Date(props.arrival_time);
          expect(value).toEqual(expectedValue);
        });
      });
    });
  });
  describe('Collapse', () => {
    it('should container proper in props', () => {
      // given
      const wrapper = shallow(<Trip {...props} />);

      const inProps = wrapper.find(Collapse).props().in;

      expect(inProps).toBe(props.isExpanded);
    });
    describe('Departure', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Trip {...props} />);

        const { className } = wrapper
          .find(Collapse)
          .find(Grid)
          .at(1)
          .props();

        expect(className).toBe(props.classes.departure);
      });
      // given
      const wrapper = shallow(<Trip {...props} />);
      const minutes = 19;

      const formattedMessageProps = wrapper
        .find(CardContent)
        .find(Typography)
        .find(FormattedMessage)
        .find('.duration__minutes')
        .props();

      // then
      expect(formattedMessageProps).toMatchObject({
        values: { amount: minutes },
        ...messages.minutes,
      });
    });
  });
});
