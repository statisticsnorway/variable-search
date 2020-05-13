import React from 'react'
import { Icon, Label, Popup } from 'semantic-ui-react'

import { SSB_COLORS } from './'

export const infoText = text => <><Icon name='info circle' style={{ color: SSB_COLORS.BLUE }} />{text}</>

export const infoPopup = (text, trigger, position = 'top left') =>
  <Popup basic flowing trigger={trigger} position={position} size='large'>{infoText(text)}</Popup>

export const subjectFieldLayout = (text, index) =>
  <Label
    tag
    key={index}
    size='large'
    content={text}
    style={{ backgroundColor: SSB_COLORS.GREEN, borderColor: SSB_COLORS.GREEN, marginRight: '0.5em' }}
  />
