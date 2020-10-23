/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react/types-6-0';
import BudSelect, { BudSelectProps } from './BudSelect';

export default {
  title: 'Components/BudSelect',
  component: BudSelect,
};

const Template: Story<BudSelectProps> = args =>
  <BudSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['option 1', 'option 2'],
};
