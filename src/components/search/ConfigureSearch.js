import React from 'react'
import { Accordion, Checkbox, Grid } from 'semantic-ui-react'

import { UI } from '../../enums'
import { MODEL } from '../../configurations'

function ConfigureSearch ({ datasetTypeFilter, handleDatasetTypeCheckbox, variableTypeFilter, handleVariableTypeCheckbox, language }) {
  const panels = [
    {
      key: 1,
      title: UI.CONFIGURE_SEARCH[language],
      content: {
        content: (
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                {UI.SHOW_OF_TYPE('DATASETS', language)[language]}
              </Grid.Column>
              <Grid.Column>
                {MODEL.DATASET_TYPES.map(datasetType =>
                  <Checkbox
                    key={datasetType}
                    label={datasetType}
                    checked={datasetTypeFilter.includes(datasetType)}
                    onClick={() => handleDatasetTypeCheckbox(datasetTypeFilter.includes(datasetType), datasetType)}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {UI.SHOW_OF_TYPE('VARIABLES', language)[language]}
              </Grid.Column>
              <Grid.Column>
                {MODEL.VARIABLE_TYPES.map(variableType =>
                  <Checkbox
                    key={variableType}
                    label={variableType}
                    checked={variableTypeFilter.includes(variableType)}
                    onClick={() => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    }
  ]

  return <Accordion defaultActiveIndex={-1} panels={panels} />
}

export default ConfigureSearch
