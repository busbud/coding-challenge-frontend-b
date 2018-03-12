import { updateQuery, fetchDepartures } from '../../App/actions';
import { mapDispatchToProps } from '../index';

describe('containers | SearchForm ', () => {
  describe('mapDispatchToProps', () => {
    describe('onChange', () => {
      it('should update outbound_date in store with correct value', () => {
        // given
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const date = 'Wed Aug 29 2018 00:00:00 GMT-0400 (EDT)';

        // when
        result.onChange(date);

        // then
        const query = { path: { outbound_date: '2018-08-29' } };
        expect(dispatch).toHaveBeenCalledWith(updateQuery(query));
      });
    });
    describe('onSubmit', () => {
      it('should dispatch action in order to fetch departures', () => {
        // given
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const event = {
          preventDefault: jest.fn(),
        };
        // when
        result.onSubmit(event);

        // then
        expect(event.preventDefault).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(fetchDepartures());
      });
    });
  });
});
