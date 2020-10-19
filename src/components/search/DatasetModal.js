import React from 'react'
import { Grid, Modal, Segment } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, SSB_STYLE } from '@statisticsnorway/dapla-js-utilities'

import { GSIM } from '../../configurations'

function DatasetModal ({ dataset, language }) {
  const { name, description } = dataset
  const localizedName = getLocalizedGsimObjectText(language, name)
  const localizedDescription = getLocalizedGsimObjectText(language, description)

  return (
    <Modal
      style={SSB_STYLE}
      content={
        <Segment basic>
          <Grid>
            {Object.entries(dataset).map(([entry, value]) =>
              <Grid.Row key={entry}>
                <Grid.Column width={4}><b>{entry}</b></Grid.Column>
                <Grid.Column width={12}>
                  {entry === GSIM.NAME || entry === GSIM.DESCRIPTION ? getLocalizedGsimObjectText(language, value) : value}
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Segment>
      }
      trigger={
        <p>
          <b>{localizedName}</b>
          <br />
          {localizedDescription}
        </p>
      }
    />
  )
}

export default DatasetModal