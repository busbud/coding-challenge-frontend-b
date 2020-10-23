import { Story } from '@storybook/react/types-6-0';
import BudInput, { BudInputProps } from './BudInput';

export default {
  title: 'Components/BudInput',
  component: BudInput,
};

const Template: Story<BudInputProps> = args =>
  <BudInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
};
