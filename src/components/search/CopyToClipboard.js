import React from 'react'
import { Icon } from 'semantic-ui-react'
import { InfoPopup, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import { UI } from '../../enums'

function CopyToClipboard ({ id, type, language }) {
  return (
    <InfoPopup
      text={UI.COPY_ID_TO_CLIPBOARD[language]}
      trigger={
        <Icon
          link
          fitted
          size='large'
          name='copy outline'
          style={{ color: SSB_COLORS.BLUE }}
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(id).then(() => {
                console.log(`Copied ${type} id to the clipboard: ${id}`)
              }, (copyError) => {
                console.log(copyError)
              })
            } else {
              console.log('Copy to clipboard not supported in your browser')
            }
          }}
        />}
    >
    </InfoPopup>
  )
}

export default CopyToClipboard
