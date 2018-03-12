import { findById, isNotEquals, getHours, getMinutes, formattedAddress } from '../helpers';

describe('utils | helpers', () => {
  describe('findById', () => {
    it('should return object from list according its id', () => {
      // given
      const list = [
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
        },
        {
          id: '4',
        },
      ];

      const id = '3';

      // when
      const result = findById(id, list);

      // then
      const expectedResult = {
        id: '3',
      };
      expect(result).toMatchObject(expectedResult);
    });
  });
  describe('isNotEquals', () => {
    it('should return true when is not equals', () => {
      // given
      const from = 'false';
      const to = 'true';

      // when
      const result = isNotEquals(from, to);

      // then
      expect(result).toBe(true);

      expect();
    });
  });
  describe('getHours', () => {
    it('should get hours from minutes', () => {
      // given
      const duration = 125;

      // when
      const hours = getHours(duration);

      // then
      expect(hours).toBe(2);
    });
  });
  describe('getMinutes', () => {
    it('should get minutes', () => {
      // given
      const duration = 125;

      // when
      const hours = getMinutes(duration);

      // then
      expect(hours).toBe(5);
    });
  });
  describe('formattedAddress', () => {
    it('should return address components joined by comma', () => {
      // given
      const components = {
        address: ['name', 'street', 'city'],
      };

      // when
      const result = formattedAddress(components);

      // then
      const expectedResult = 'name, street, city';
      expect(result).toBe(expectedResult);
    });
  });
});
