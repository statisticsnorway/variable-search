import React from 'react'
import { Grid, Modal, Segment } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, SSB_STYLE } from '@statisticsnorway/dapla-js-utilities'

function DatasetModal ({ dataset, language }) {
  const { name } = dataset
  const localizedName = getLocalizedGsimObjectText(language, name)

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
                  {entry === 'name' || entry === 'description' ? getLocalizedGsimObjectText(language, value) : value}
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Segment>
      }
      trigger={<span>{localizedName}</span>}
    />
  )
}

export default DatasetModal