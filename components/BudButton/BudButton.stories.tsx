import { Story } from '@storybook/react/types-6-0';
import BudButton, { BudButtonProps } from './BudButton';

export default {
  title: 'Components/BudButton',
  component: BudButton,
};

const Template: Story<BudButtonProps> = args =>
  (
    <BudButton {...args}>Button</BudButton>
  );

export const Default = Template.bind({});
Default.args = {
  size: 'md',
};
