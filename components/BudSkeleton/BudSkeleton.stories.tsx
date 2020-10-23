/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react/types-6-0';
import BudSkeleton from './BudSkeleton';

export default {
  title: 'Components/BudSkeleton',
  component: BudSkeleton,
};

const Template: Story = args =>
  <BudSkeleton {...args} />;

export const Default = Template.bind({});
Default.args = {};
