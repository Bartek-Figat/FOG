import React from 'react';
import { Button } from '../atomicDesign/atoms/index';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button className="btn-base bg-gray-900 hover:bg-gray-800 " {...args} >Continue with GitHub</Button>;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button',
};
