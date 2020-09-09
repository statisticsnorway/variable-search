import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'
import { SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import { RESULTS } from '../../enums'

function FilterWarning ({ language, filtered, total }) {
  return (
    <>
      <Icon name='warning circle' style={{ color: SSB_COLORS.YELLOW }} />
      {RESULTS.HAVE_FILTERED(filtered, total)[language]}
      <Divider hidden />
    </>

  )
}

export default FilterWarning
