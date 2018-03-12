import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'material-ui-pickers';
import SearchForm from '../component';
import messages from '../messages';
import { toDate } from 'date-fns';

const props = {
  classes: {
    root: 'fakeRootClass',
    textField: 'fakeTextfieldClass',
    button_wrapper: 'fakeButtonWrapperClass',
    button: 'fakeButtonClass',
    circularProgress: 'fakeCircularProgressClass',
  },
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  outbound_date: toDate('2018-08-02'),
  isFetching: true,
};

describe('component | SearchForm | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<SearchForm {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<SearchForm {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('form', () => {
    it('should have proper onSubmit props', () => {
      // given
      const wrapper = shallow(<SearchForm {...props} />);
      const { onSubmit } = wrapper.props();

      // then
      expect(onSubmit).toBe(props.onSubmit);
    });
  });

  describe('Field', () => {
    describe('origin', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const { className } = wrapper
          .find(TextField)
          .filter('#origin')
          .props();

        // then
        expect(className).toBe(props.classes.textField);
      });
      it('should have proper label', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const formattedMessageProps = wrapper
          .find(TextField)
          .filter('#origin')
          .props().label.props;

        // then
        expect(formattedMessageProps).toMatchObject(messages.origin_label);
      });
    });
    describe('destination', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const { className } = wrapper
          .find(TextField)
          .filter('#destination')
          .props();

        // then
        expect(className).toBe(props.classes.textField);
      });
      it('should have proper label', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const formattedMessageProps = wrapper
          .find(TextField)
          .filter('#destination')
          .props().label.props;

        // then
        expect(formattedMessageProps).toMatchObject(messages.destination_label);
      });
    });
    describe('outbound_date', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const { className } = wrapper
          .find(DatePicker)
          .filter('#outbound_date')
          .props();

        // then
        expect(className).toBe(props.classes.textField);
      });
      it('should have proper label', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const formattedMessageProps = wrapper.find(DatePicker).props().label.props;

        // then
        expect(formattedMessageProps).toMatchObject(messages.outbound_date_label);
      });
      it('should have proper value', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const { value } = wrapper.find(DatePicker).props();

        // then
        const expectedValue = props.outbound_date;
        expect(value).toEqual(expectedValue);
      });
      it('should have correct onChange props', () => {
        // given
        const wrapper = shallow(<SearchForm {...props} />);
        const { onChange } = wrapper.find(DatePicker).props();

        // then
        expect(onChange).toEqual(props.onChange);
      });
    });
  });
});
