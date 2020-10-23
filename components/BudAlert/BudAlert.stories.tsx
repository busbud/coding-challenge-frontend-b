import { Story } from '@storybook/react/types-6-0';
import BudAlert, { BudAlertProps } from './BudAlert';

export default {
  title: 'Components/BudAlert',
  component: BudAlert,
};

const Template: Story<BudAlertProps> = args =>
  <BudAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Warning title',
  visible: true,
};
