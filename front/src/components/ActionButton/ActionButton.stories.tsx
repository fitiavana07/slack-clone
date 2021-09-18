import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ActionButton from './ActionButton'

export default {
  title: 'ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>

const Template: ComponentStory<typeof ActionButton> = (args) => (
  <ActionButton {...args}>Button</ActionButton>
)

export const Default = Template.bind({})
Default.args = {
  loading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
}
