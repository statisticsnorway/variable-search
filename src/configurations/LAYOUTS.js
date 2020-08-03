import React from 'react'
import { Label } from 'semantic-ui-react'
import { SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

export const subjectFieldLayout = (text, index) =>
  <Label
    tag
    key={index}
    size='large'
    content={text}
    style={{ backgroundColor: SSB_COLORS.GREEN, borderColor: SSB_COLORS.GREEN, marginRight: '0.5em' }}
  />
