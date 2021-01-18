// Packages
import React from 'react'

// Component
import Accordion from '.'

export default {
  title: 'Components/Accordion',
  component: Accordion
}

const TriggerComponent = ({ title }: any) => <h2>{title}</h2>

export const Default = () => (
  <div style={{ minWidth: '900px' }}>
    <Accordion trigger={<TriggerComponent title="Busbud" />}>
      <h4>Example 1</h4>
      <h4>Example 2</h4>
      <h4>Example 3</h4>
    </Accordion>
    <Accordion trigger={<TriggerComponent title="Bus Travel" />}>
      <h4>Example 1</h4>
      <h4>Example 2</h4>
      <h4>Example 3</h4>
    </Accordion>
  </div>
)
